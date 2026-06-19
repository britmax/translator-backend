app.post("/translate", async (req, res) => {
  try {
    const { text, target } = req.body;

    if (!text || !target) {
      return res.json({ translated: "", error: "Missing text or target language" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "Translate the text into the target language. Return ONLY the translation." },
          { role: "user", content: `Translate to ${target}: ${text}` }
        ]
      })
    });

    const data = await response.json();

    const output =
      data?.choices?.[0]?.message?.content?.trim() ||
      "";

    if (!output) {
      return res.json({ translated: "", error: "Model returned no output" });
    }

    res.json({ translated: output });

  } catch (err) {
    console.error("Translation error:", err);
    res.json({ translated: "", error: "Server error" });
  }
});
