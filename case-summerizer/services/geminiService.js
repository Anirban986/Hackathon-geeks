const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔥 UPDATED: Using the model your scan confirmed exists
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash", 
  generationConfig: {
    responseMimeType: "application/json" // 2.5 supports strict JSON!
  }
});

exports.generateSummary = async (text) => {
  let raw = ""; 

  const prompt = `
  You are a legal AI assistant.
  Summarize the following case document.
  
  RETURN ONLY RAW JSON.
  
  {
    "case_title": "string",
    "parties_involved": "string",
    "key_facts": ["string"],
    "legal_issues": "string",
    "applicable_sections": "string",
    "petitioner_arguments": "string",
    "respondent_arguments": "string",
    "judgment_summary": "string",
    "important_dates": ["string"]
  }

  Case Document:
  ${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Extract text
    raw = response.text();

    if (!raw) throw new Error("Empty AI response");

    // Clean Markdown if present (e.g. ```json ... ```)
    const cleanedText = raw.replace(/```json/g, "").replace(/```/g, "").trim();

    // Parse JSON
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("🔥 GEMINI SERVICE ERROR:", error.message);
    
    // Log the raw response only if it exists (prevents "raw is not defined" crash)
    if (raw) {
        console.log("RAW RESPONSE THAT FAILED:", raw);
    }

    return {
      case_title: "Error processing document",
      parties_involved: "Unknown",
      judgment_summary: `System Error: ${error.message}.`,
      key_facts: [],
      important_dates: []
    };
  }
};
