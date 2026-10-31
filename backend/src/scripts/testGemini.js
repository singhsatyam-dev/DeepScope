import { gemini, GEMINI_MODEL } from "../config/ai.js";

console.log("1. Gemini test script started");
console.log("2. Model:", GEMINI_MODEL);
console.log("3. Sending request to Gemini...");

const testGemini = async () => {
  try {
    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: "Explain what an AI research assistant does in 3 sentences.",
    });

    console.log("\nGemini Response:\n");
    console.log(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error.message);
  }
};

testGemini();
