const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = "AIzaSyCLWwTnaGsnwqIPtaz1FP2AnNwS86trVeY"; // ⚠️ Apni Gemini API Key Yaha Dalein

app.get("/", (req, res) => {
  res.send("Gemini API is Running!");
});

app.get("/ask", async (req, res) => {
  const query = req.query.ask;
  if (!query) {
    return res.json({ error: "Query missing! Use ?ask=your_question" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      { contents: [{ role: "user", parts: [{ text: query }] }] }
    );

    res.json({
      response: response.data.candidates[0].content.parts[0].text,
      credit: {
        "Rk join": "@TEAM_X_OG",
        "dev": "@PB_X01"
      }
    });
  } catch (error) {
    res.json({ error: "Gemini API Error!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
