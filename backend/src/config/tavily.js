import "dotenv/config";
import { tavily } from "@tavily/core";

// Check whether Tavily API key exists
if (!process.env.TAVILY_API_KEY) {
  throw new Error("TAVILY_API_KEY is missing from .env");
}

// Initialize Tavily client
export const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});
