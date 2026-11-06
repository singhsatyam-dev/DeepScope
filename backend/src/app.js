import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import researchRouter from "./routes/research.routes.js";
import authRouter from "./routes/auth.routes.js";

import { errorMiddleware } from "./Middlewares/error.middleware.js";

const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
  Boolean,
);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

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
