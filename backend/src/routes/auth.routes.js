import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  meController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.get("/me", authMiddleware, meController);

export default authRouter;
