import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// -------------------------------
// TRANSLATION ENDPOINT
// -------------------------------
app.post("/translate", async (req, res) => {
  const { text, target } = req.body;

  if (!text || !target) {
    return res.status(400).json({ error: "Missing 'text' or 'target' in request body" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: `Translate all user text into ${target}. Output ONLY plain text.`
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await response.json();
    const translated = data.choices?.[0]?.message?.content || "";

    res.json({ translated });
  } catch (err) {
    res.status(500).json({ error: "Translation failed", details: err.message });
  }
});

// -------------------------------
// WIDGET ENDPOINT
// -------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/widget", (req, res) => {
  res.sendFile(path.join(__dirname, "widget.html"));
});

// -------------------------------
// START SERVER
// -------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Translator backend running on port ${PORT}`);
});
