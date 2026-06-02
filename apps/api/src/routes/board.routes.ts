import { Router } from "express";
import { boardSchema } from "@taskflow/shared";
import { boardController } from "../controllers/board.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

export const boardRoutes = Router();

boardRoutes.use(requireAuth);
boardRoutes.get("/", boardController.list);
boardRoutes.get("/:id", boardController.get);
boardRoutes.post("/", validate(boardSchema), boardController.create);
boardRoutes.put("/:id", validate(boardSchema), boardController.update);
boardRoutes.delete("/:id", boardController.delete);
