import { gemini, GEMINI_MODEL } from "../config/ai.js";

import { searchWeb } from "../../tools/searchWeb.js";
import { searchWebDeclaration } from "../../tools/searchWebDeclaration.js";

export const runResearchAgent = async (question) => {
  try {
    console.log("\nStarting ResearchPilot AI agent...");

    let interaction = await gemini.interactions.create({
      model: GEMINI_MODEL,
      input: question,
      tools: [searchWebDeclaration],

      system_instruction: `
          You are ResearchPilot AI, an intelligent research assistant.

          - Use search_web to gather relevant information for research questions.
          - Base factual claims on retrieved sources. Never invent facts or sources.
          - Analyze and summarize results in clear, structured Markdown.
          - Use numbered inline citations like [1], [2] for factual claims.
          - End with a Sources section containing matching source titles and URLs.
          - Mention when available sources are insufficient.
          - Avoid repetition and distinguish facts from speculation.
        `,
    });

    let searchCount = 0;
    const MAX_SEARCHES = 3;

    // Collect sources from all searches
    const sourcesMap = new Map();

    while (true) {
      const functionCalls = (interaction.steps ?? []).filter(
        (step) => step.type === "function_call",
      );

      if (functionCalls.length === 0) {
        break;
      }

      const functionResults = [];

      for (const call of functionCalls) {
        if (call.name !== "search_web") {
          throw new Error(`Unknown tool: ${call.name}`);
        }

        if (searchCount >= MAX_SEARCHES) {
          throw new Error("Maximum search limit reached");
        }

        searchCount++;

        const { query } = call.arguments;

        console.log(`\nExecuting search ${searchCount}: ${query}`);

        // Execute Tavily search
        const results = await searchWeb(query);

        // Assign stable source numbers and collect unique sources.
        const numberedResults = results.map((result) => {
          if (!result.url) {
            return result;
          }

          if (!sourcesMap.has(result.url)) {
            const sourceNumber = sourcesMap.size + 1;

            sourcesMap.set(result.url, {
              title: result.title,
              url: result.url,
              content: result.content,
              score: result.score,
              sourceNumber,
            });
          }

          const savedSource = sourcesMap.get(result.url);

          return {
            ...result,
            sourceNumber: savedSource.sourceNumber,
          };
        });

        // Return search results to Gemini
        functionResults.push({
          type: "function_result",
          name: call.name,
          call_id: call.id,
          result: [
            {
              type: "text",
              text: JSON.stringify(results),
            },
          ],
        });
      }

      interaction = await gemini.interactions.create({
        model: GEMINI_MODEL,
        previous_interaction_id: interaction.id,
        tools: [searchWebDeclaration],
        input: functionResults,
      });
    }

    // Return report and collected sources
    return {
      answer: interaction.output_text,
      searchesPerformed: searchCount,
      sources: Array.from(sourcesMap.values()),
    };
  } catch (error) {
    console.error("Research agent failed:", error);

    throw error;
  }
};
