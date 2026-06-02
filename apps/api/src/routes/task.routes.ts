import { Router } from "express";
import { moveTaskSchema, taskSchema } from "@taskflow/shared";
import { taskController } from "../controllers/task.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

export const taskRoutes = Router();

taskRoutes.use(requireAuth);
taskRoutes.get("/", taskController.list);
taskRoutes.get("/:id", taskController.get);
taskRoutes.post("/", validate(taskSchema), taskController.create);
taskRoutes.put("/:id", validate(taskSchema.partial()), taskController.update);
taskRoutes.patch("/:id/move", validate(moveTaskSchema), taskController.move);
taskRoutes.delete("/:id", taskController.delete);
