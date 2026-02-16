exports.buildPrompt = (caseText) => {
  return `
You are an expert legal AI assistant.

Analyze the following case document and return structured summary in STRICT JSON format:

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
${caseText}
`;
};
