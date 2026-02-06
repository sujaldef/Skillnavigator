import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3
        })
      }
    );

    const data = await response.json();

    console.log("🔍 Groq raw response:", JSON.stringify(data, null, 2));
    
    if (!data.choices || !data.choices.length) {
      return res.status(500).json({
        error: "Groq returned no choices",
        raw: data
      });
    }
     {/* */}
    res.json({ text: data.choices[0].message.content });
    

  } catch (e) {
    console.error("🔥 Groq error:", e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(5000, () =>
  console.log("✅ Proxy running on http://localhost:5000")
);
