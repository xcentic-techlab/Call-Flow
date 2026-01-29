import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const PROMPT_SERVER = "http://89.116.121.214:8000";

router.post("/prompts/update", async (req, res) => {
  try {
    // console.log("Proxy → Update prompt");

    const response = await fetch(`${PROMPT_SERVER}/prompts/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return res.status(response.status).json(data);
    } catch {
      console.error("Update prompt non-JSON:", text);
      return res.status(502).send(text);
    }
  } catch (error) {
    console.error("Prompt update proxy error:", error);
    return res.status(500).json({ error: "Failed to update prompt" });
  }
});

export default router;
