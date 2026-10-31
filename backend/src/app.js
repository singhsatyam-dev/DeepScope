import express from "express";
import cors from "cors";

import researchRouter from "./routes/research.routes.js";

import { errorMiddleware } from "./Middlewares/error.middleware.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to ResearchPilot AI API",
  });
});

app.use("/api/research", researchRouter);

app.use(errorMiddleware)

export default app;
