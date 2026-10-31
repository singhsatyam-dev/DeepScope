import { gemini,GEMINI_MODEL } from "../config/ai.js";
import { searchWebDeclaration } from "../../tools/searchWebDeclaration.js";

const testFunctionCalling = async () => {
    try {
        console.log("Sending research question to Gemini...");

        const interaction = await gemini.interactions.create({
            model: GEMINI_MODEL,

            input:
                "Find the latest developments in AI agents in October 2026. " +
                "Use the search_web tool to find recent sources.",

            tools: [searchWebDeclaration],
        });

        console.log("\nGemini interaction steps:\n");

        for (const step of interaction.steps ?? []) {
            if (step.type === "function_call") {
                console.log("Tool requested:", step.name);
                console.log("Arguments:", step.arguments);
                console.log("Call ID:", step.id);
            }
        }

        console.log("\nModel response:", interaction.output_text);

    } catch (error) {
        console.error("Function calling error:", error.message);
    }
};

testFunctionCalling();