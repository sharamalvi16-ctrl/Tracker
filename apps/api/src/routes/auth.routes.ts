import { Router } from "express";
import { loginSchema, registerSchema } from "@taskflow/shared";
import { authController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

export const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), authController.register);
authRoutes.post("/login", validate(loginSchema), authController.login);
authRoutes.post("/logout", authController.logout);
authRoutes.post("/refresh", authController.refresh);
authRoutes.get("/me", requireAuth, authController.me);
