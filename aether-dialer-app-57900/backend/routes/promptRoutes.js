import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("http://89.116.121.214:8000/prompts");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Prompt Proxy Error:", error);
    res.status(500).json({ error: "Failed to load prompts" });
  }
});

export default router;
