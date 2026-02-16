const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateSummary = async (text) => {

  const prompt = `
You are a legal AI assistant.

Return ONLY JSON. No explanation. No markdown.

{
  "case_title": "",
  "parties_involved": "",
  "key_facts": [],
  "legal_issues": "",
  "applicable_sections": "",
  "petitioner_arguments": "",
  "respondent_arguments": "",
  "judgment_summary": "",
  "important_dates": []
}

Case Document:
${text}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    // 🔥 Universal text extractor (works for every Gemini response type)
    let raw =
      response?.text?.() ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    if (!raw) throw new Error("Empty AI response");

    // clean markdown
    raw = raw.replace(/```json/g, "")
             .replace(/```/g, "")
             .trim();

    // isolate JSON
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
      raw = raw.substring(start, end + 1);
    }

    return JSON.parse(raw);

  } catch (err) {
    console.error("Gemini Error:", err.message);

    return {
      case_title: "AI parsing failed",
      parties_involved: "",
      key_facts: [],
      legal_issues: "",
      applicable_sections: "",
      petitioner_arguments: "",
      respondent_arguments: "",
      judgment_summary: "The AI response could not be structured. Try another PDF.",
      important_dates: []
    };
  }
};
