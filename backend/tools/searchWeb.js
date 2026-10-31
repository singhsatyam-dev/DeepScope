import { tavilyClient } from "../src/config/tavily.js";

export const searchWeb = async (query) => {
  // Validate the search query
  if (!query || typeof query !== "string" || !query.trim()) {
    throw new Error("A valid search query is required");
  }

  // Search the web using Tavily
  const response = await tavilyClient.search(query.trim(), {
    searchDepth: "basic",
    maxResults: 5,
  });

  // Return only the information our AI agent needs
  return response.results.map((result) => ({
    title: result.title,
    url: result.url,
    content: result.content,
    score: result.score,
  }));
};
