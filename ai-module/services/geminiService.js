const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateSummary = async (text) => {

  const prompt = `
You are an expert legal AI assistant.

Return ONLY valid JSON.

{
  "case_title": "",
  "parties_involved": "",
  "key_facts": "",
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

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};
