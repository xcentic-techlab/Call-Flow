import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import SingleCall from "../models/SingleCall.js";
import BulkCall from "../models/BulkCall.js";
import User from "../models/TempUser.js";
import { callPhoneNumber } from "../utils/callService.js";

const router = express.Router();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Token failed" });
  }
};

router.post("/singleCall", protect, async (req, res) => {
  try {
    const { phone_number } = req.body;

    if (!phone_number || typeof phone_number !== "string") {
      return res.status(400).json({ error: "phone_number is required" });
    }

    console.log("Single Call Detected:", phone_number);
    console.log("User ID:", req.user?._id);

    const callEntry = await SingleCall.create({
      user: req.user._id,
      phoneNumber: phone_number,
    });

    console.log("Saved to SingleCall DB:", callEntry._id);

    try {
      const aiResponse = await axios.post(
        process.env.AI_SERVER_URL,
        { phone_number },
        { headers: { "Content-Type": "application/json" }, timeout: 15000 }
      );

      console.log("AI Response (Single):", aiResponse.data);

      return res.status(200).json({
        message: "Single call stored & forwarded",
        aiResponse: aiResponse.data,
        data: callEntry,
      });
    } catch (err) {
      console.error("AI server (single) error:", err.message);
      return res.status(200).json({
        message: "Single call stored locally but AI server unreachable",
        error: err.message,
        data: callEntry,
      });
    }
  } catch (error) {
    console.error("Main Single Call Error:", error);
    return res.status(500).json({
      message: "Call failed",
      error: error.message || "Unexpected error",
    });
  }
});


router.post("/bulkCall", protect, async (req, res) => {
  try {
    const { phoneNumbers } = req.body;

    if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      return res.status(400).json({ error: "phoneNumbers array is required" });
    }

    console.log("Bulk Call Detected:", phoneNumbers);
    console.log("User ID:", req.user?._id);

    const bulkEntry = await BulkCall.create({
      user: req.user._id,
      phoneNumbers,
    });

    console.log("✅ Saved to BulkCall DB:", bulkEntry._id);

    const batchSize = 50; // Adjust as per server capacity
    const localResults = [];

    for (let i = 0; i < phoneNumbers.length; i += batchSize) {
      const batch = phoneNumbers.slice(i, i + batchSize);
      console.log(`Processing batch ${i / batchSize + 1} with ${batch.length} numbers...`);

      const batchResults = await Promise.all(
        batch.map(async (num) => {
          try {
            return await callPhoneNumber(num);
          } catch (err) {
            console.error(`Call failed for ${num}:`, err.message);
            return { number: num, status: "failed", error: err.message };
          }
        })
      );

      localResults.push(...batchResults);
    }

    console.log("Local call simulations complete:", localResults.length);
    const aiResponses = [];

    for (const num of phoneNumbers) {
      try {
        const aiRes = await axios.post(
          process.env.AI_SERVER_URL,
          { phone_number: num },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 15000,
          }
        );

        console.log(`AI call success for ${num}:`, aiRes.data);
        aiResponses.push({ number: num, status: "success", response: aiRes.data });
      } catch (err) {
        console.error(`AI call failed for ${num}:`, err.message);
        aiResponses.push({ number: num, status: "failed", error: err.message });
      }
    }

    console.log("✅ All AI calls processed:", aiResponses.length);

    return res.status(200).json({
      message: "✅ Bulk call stored, simulated locally, and sent individually to AI server",
      aiResponses,
      localResults,
      data: bulkEntry,
    });
  } catch (error) {
    console.error("Main Bulk Call Error:", error);
    return res.status(500).json({
      message: "Bulk call failed",
      error: error.message || "Unexpected error",
    });
  }
});

export default router;
