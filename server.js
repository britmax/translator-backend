import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text, target } = req.body;

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

app.listen(3000, () => {
  console.log("Translator backend running on port 3000");
});
