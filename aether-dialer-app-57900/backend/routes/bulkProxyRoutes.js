import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import csv from "csv-parser";
import xlsx from "xlsx";
import { Readable } from "stream";
import BulkNumber from "../models/BulkNumber.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

function extractPhoneFromRow(row) {
  for (const value of Object.values(row)) {
    if (!value) continue;

    const phone = value.toString().replace(/\D/g, "");

    if (phone.length >= 10 && phone.length <= 13) {
      return phone;
    }
  }
  return null;
}

router.post("/bulk-upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File missing" });
    }

    const businessType = req.body.business_type || "";
    const numbers = [];
    const fileName = req.file.originalname.toLowerCase();

    if (fileName.endsWith(".csv")) {
      const stream = Readable.from(req.file.buffer);

      await new Promise((resolve, reject) => {
        stream
          .pipe(csv())
          .on("data", (row) => {
            const phone = extractPhoneFromRow(row);
            if (phone) {
              numbers.push({
                phone,
                business_type: businessType,
              });
            }
          })
          .on("end", resolve)
          .on("error", reject);
      });
    }

    else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rows = xlsx.utils.sheet_to_json(sheet);

      for (const row of rows) {
        const phone = extractPhoneFromRow(row);
        if (phone) {
          numbers.push({
            phone,
            business_type: businessType,
          });
        }
      }
    }

    else {
      return res.status(400).json({
        error: "Only CSV, XLS, XLSX files allowed",
      });
    }

    // console.log("Numbers extracted:", numbers.length);

    if (!numbers.length) {
      return res.status(400).json({
        error: "No valid phone numbers found in file",
      });
    }

    await BulkNumber.insertMany(numbers);
    // console.log("Numbers saved to DB");

    const formData = new FormData();
    formData.append("file", req.file.buffer, {
  filename: req.file.originalname,
  contentType: req.file.mimetype,
});

    formData.append("business_type", businessType);

    const response = await fetch("http://89.116.121.214:8000/bulk-upload", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("External API non-JSON:", text);
      return res.status(502).send(text);
    }

    return res.status(response.status).json({
      ...data,
      saved: numbers.length,
    });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ error: "Bulk upload failed" });
  }
});

export default router;
