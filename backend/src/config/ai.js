import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing from .env");
}

// Initialize Gemini
export const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Keep the model configurable through .env
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
