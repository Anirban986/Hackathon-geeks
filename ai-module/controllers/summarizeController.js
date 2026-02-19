const fs = require("fs");
const { extractTextFromPDF } = require("../services/pdfService");
const { generateSummary } = require("../services/geminiService");
const { chunkText } = require("../services/chunkService");

exports.summarizeCase = async (req, res) => {
  try {
    console.log("Request received");

    const filePath = req.file.path;

    const text = await extractTextFromPDF(filePath);

    console.log("Text length:", text.length);

    const limitedText = text.slice(0, 8000); // TEMP limit

    console.log("Sending to Gemini...");

    const summary = await generateSummary(limitedText);

    console.log("Gemini response received");

    res.json({
      success: true,
      summary: summary
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error summarizing case"
    });
  }
};
