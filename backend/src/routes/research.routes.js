import express from "express";

import {
  createResearchController,
  getAllResearchesController,
  getResearchByIdController,
  deleteResearchController,
} from "../controllers/research.controller.js";

import { authMiddleware } from "../Middlewares/auth.middleware.js";

const researchRouter = express.Router();

researchRouter.use(authMiddleware);

researchRouter.post("/", createResearchController);
researchRouter.get("/", getAllResearchesController);
researchRouter.get("/:id", getResearchByIdController);

researchRouter.delete("/:id", deleteResearchController);

export default researchRouter;
