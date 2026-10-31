import { tavilyClient } from "../config/tavily.js";

const testTavily = async () => {
  try {
    console.log("Searching the web using Tavily...");

    const response = await tavilyClient.search(
      "Latest developments in artificial intelligence in 2026",
      {
        searchDepth: "basic",
        maxResults: 5,
      },
    );

    console.log("\nSearch Results:\n");

    response.results.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.title}`);
      console.log(`URL: ${result.url}`);
      console.log(`Content: ${result.content.substring(0, 300)}...`);
    });
  } catch (error) {
    console.error("Tavily API Error:", error);
  }
};

testTavily();
