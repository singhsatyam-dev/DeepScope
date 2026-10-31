import express from "express";

import {
  createResearchController,
  getAllResearchesController,
  getResearchByIdController,
  deleteResearchController,
} from "../controllers/research.controller.js";

const researchRouter = express.Router();

researchRouter.post("/", createResearchController);
researchRouter.get("/", getAllResearchesController);
researchRouter.get("/:id", getResearchByIdController);

researchRouter.delete("/:id", deleteResearchController);

export default researchRouter;
