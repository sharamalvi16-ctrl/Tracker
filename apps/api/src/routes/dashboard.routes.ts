import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const dashboardRoutes = Router();

dashboardRoutes.get("/summary", requireAuth, dashboardController.summary);
