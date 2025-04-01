const express = require("express");
const genai = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY; // ⚠️ Environment variable use karein

if (!API_KEY) {
  console.error("❌ ERROR: Gemini API Key not found!");
  process.exit(1);
}

// Gemini API Initialize
genai.configure({ apiKey: API_KEY });
const text_model = new genai.GenerativeModel("gemini-1.5-pro");
const vision_model = new genai.GenerativeModel("gemini-1.5-pro-vision");

app.get("/", (req, res) => {
  res.send("✅ Gemini API is Running!");
});

// 🌟 **Text AI API Route**
app.get("/ask", async (req, res) => {
  const query = req.query.ask;
  if (!query) {
    return res.json({ error: "❌ Query missing! Use ?ask=your_question" });
  }

  try {
    const result = await text_model.generateContent(query);
    res.json({
      response: result.response.text(),
      credit: {
        "Rk join": "@TEAM_X_OG",
        "dev": "@PB_X01"
      }
    });
  } catch (error) {
    res.json({ error: "❌ Gemini API Error!", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
