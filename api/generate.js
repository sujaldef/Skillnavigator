export default async function handler(req, res) {

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    try {
  
      const { prompt } = req.body || {};
  
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Invalid prompt" });
      }
  
      // Detect if quiz request (expects JSON)
      const wantsJSON =
        prompt.includes('"questions"') ||
        prompt.includes("Return ONLY valid JSON");
  
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
      const text = data?.choices?.[0]?.message?.content || "";
  
      // QUIZ → parse JSON safely
      if (wantsJSON) {
        const match = text.match(/\{[\s\S]*\}/);
  
        if (!match) {
          return res.status(200).json({
            json: { questions: [] }
          });
        }
  
        try {
          return res.status(200).json({
            json: JSON.parse(match[0])
          });
        } catch {
          return res.status(200).json({
            json: { questions: [] }
          });
        }
      }
  
      // STUDY / CHAT → return text normally
      return res.status(200).json({ text });
  
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  