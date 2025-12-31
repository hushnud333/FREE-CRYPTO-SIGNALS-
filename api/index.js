// /api/index.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST method required" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message not provided" });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Crypto bo‘yicha ekspert tarzida javob bering:\n\n${message}`,
      }),
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      return res.status(500).json({ error: data });
    }

    // OpenAI javobini oling
    const text = data.output[0].content[0].text || "Hech narsa topilmadi.";

    res.status(200).json({ reply: text });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
