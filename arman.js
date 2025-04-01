export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("ask");

    if (!query) {
      return new Response(JSON.stringify({ error: "Query missing! Please add ?ask=your_question" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const API_KEY = "AIzaSyCLWwTnaGsnwqIPtaz1FP2AnNwS86trVeY"; // ⚠️ Yaha apni Gemini API key daalein

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: query }] }]
      }),
    });

    const data = await geminiResponse.json();

    if (!data.candidates || data.candidates.length === 0) {
      return new Response(JSON.stringify({ error: "Gemini API failed!" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      response: data.candidates[0].content.parts[0].text,
      credit: {
        "join": "@TEAM_X_OG",
        "dev": "@PB_X01"
      }
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }
};