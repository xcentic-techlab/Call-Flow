import express from "express";
import fetch from "node-fetch";
import SingleNumber from "../models/SingleNumber.js";

const router = express.Router();

router.post("/single-call", async (req, res) => {
  try {
    const { phone_number, business_type } = req.body;

    if (!phone_number) {
      return res.status(400).json({ error: "phone_number is required" });
    }
    const saved = await SingleNumber.create({
      phone: phone_number,
      business_type,
    });

    console.log("Single number saved:", saved._id);

    const payload = {
      phone_number,
      business_type,
    };

    const response = await fetch("http://89.116.121.214:8000/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      timeout: 15000,
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
      status: "success",
      savedId: saved._id,
      aiResponse: data,
    });
  } catch (error) {
    console.error("Single call proxy error:", error);
    return res.status(500).json({
      error: "Single call failed",
      message: error.message,
    });
  }
});

export default router;
