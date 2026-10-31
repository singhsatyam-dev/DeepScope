import { searchWeb } from "../../tools/searchWeb.js";

const testSearch = async () => {
  try {
    console.log("Testing reusable searchWeb function...");

    const results = await searchWeb(
      "Latest developments in AI agent technology in 2026",
    );

    console.log("\nSearch Results:\n");
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error("Search Error:", error);
  }
};

testSearch();
