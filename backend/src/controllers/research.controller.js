import {
  createResearch,
  getAllResearches,
  getResearchById,
  deleteResearch,
} from "../services/research.service.js";

export const createResearchController = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "A valid research question is required",
      });
    }

    if (question.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Research question cannot exceed 1000 characters",
      });
    }

    const research = await createResearch(question.trim(), req.user.id);

    return res.status(201).json({
      success: true,
      message: "Research request created successfully",
      data: research,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllResearchesController = async (req, res, next) => {
  try {
    const researches = await getAllResearches(req.user.id);

    return res.status(200).json({
      success: true,
      count: researches.length,
      data: researches,
    });
  } catch (error) {
    next(error);
  }
};

export const getResearchByIdController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid research ID",
      });
    }

    const research = await getResearchById(id, req.user.id);

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Research not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: research,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResearchController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid research ID",
      });
    }

    const deleted = await deleteResearch(id, req.user.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Research not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Research deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
