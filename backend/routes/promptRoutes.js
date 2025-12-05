import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    ecommerce: "Your ecommerce prompt...",
    real_estate: "Your real estate prompt...",
    salon: "Your salon prompt...",
    dental_clinic: "आप एक डेंटल क्लिनिक के शेड्यूलिंग असिस्टेंट हैं…",
    restaurant: "आप एक रेस्टोरेंट के बुकिंग असिस्टेंट हैं…"
  });
});

export default router;
