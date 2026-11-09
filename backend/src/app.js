import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import researchRouter from "./routes/research.routes.js";
import authRouter from "./routes/auth.routes.js";

import { errorMiddleware } from "./Middlewares/error.middleware.js";

const app = express();

// cors configuration for render
const normalizeOrigin = (origin) =>
  origin?.trim().replace(/\/+$/, "");

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
]
  .map(normalizeOrigin)
  .filter(Boolean);

console.log("CLIENT_URL from Render:", process.env.CLIENT_URL);
console.log("Allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = normalizeOrigin(origin);

      console.log("Incoming request origin:", normalizedOrigin);

      if (!origin || allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.error("Blocked origin:", normalizedOrigin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DeepScope API is running",
  });
});

// Health check for Render
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DeepScope API is healthy",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/research", researchRouter);

app.use(errorMiddleware);

export default app;


