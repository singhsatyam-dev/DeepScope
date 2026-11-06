import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/auth.service.js";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

//sign up
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name cannot exceed 100 characters",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const user = await registerUser({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Please log in.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//login
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const { token, user } = await loginUser({ email, password });

    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//logout
export const logoutController = (req, res) => {
  res.clearCookie("token", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

//return self
export const meController = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
