const fs = require("fs");
const { extractTextFromPDF } = require("../services/pdfService");
const { generateSummary } = require("../services/geminiService");
const { chunkText } = require("../services/chunkService");

exports.summarizeCase = async (req, res) => {
  try {
    console.log("Request received");
    if (!req.file) {
      return res.status(400).json({
        error: "No PDF uploaded"
      });
    }
    const filePath = req.file.path;

    const text = await extractTextFromPDF(filePath);

    console.log("Text length:", text.length);

    const limitedText = text.slice(0, 8000); // TEMP limit

    console.log("Sending to Gemini...");

    const summary = await generateSummary(limitedText);

    console.log("Gemini response received");
     if (!summary || typeof summary !== "object") {
      return res.status(500).json({
        error: "AI returned invalid format"
      });
    }
   return res.json(summary);

  } catch (error) {
    console.error("🔥 CONTROLLER CRASH:", error);

    return res.status(500).json({
      error: error.message
    });
  }
  };

