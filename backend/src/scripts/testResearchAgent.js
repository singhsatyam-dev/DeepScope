import { runResearchAgent } from "../services/researchAgent.js";

const testAgent = async () => {
    try {
        const question =
            "What are the latest developments in AI agents in October 2026?";

        console.log("\nResearch Question:", question);

        const result = await runResearchAgent(question);

        console.log("\n========== FINAL RESEARCH REPORT ==========\n");

        console.log(result.answer);

        console.log("\nSearches performed:", result.searchesPerformed);

    } catch (error) {
        console.error("Agent Test Failed:", error.message);
    }
};

testAgent();