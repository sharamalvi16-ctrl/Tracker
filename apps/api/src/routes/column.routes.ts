import { Router } from "express";
import { columnSchema } from "@taskflow/shared";
import { prisma } from "../config/prisma.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { AppError } from "../utils/errors.js";

export const columnRoutes = Router();

columnRoutes.use(requireAuth);

columnRoutes.post("/", validate(columnSchema), async (req, res) => {
  const board = await prisma.board.findFirst({ where: { id: req.body.boardId, ownerId: req.user!.id } });
  if (!board) throw new AppError(403, "Board is not available", "FORBIDDEN");
  res.status(201).json(await prisma.column.create({ data: req.body }));
});

columnRoutes.put("/:id", validate(columnSchema.pick({ title: true, position: true }).partial()), async (req, res) => {
  const id = req.params.id;
  if (typeof id !== "string") throw new AppError(400, "Route id is required", "BAD_REQUEST");
  const column = await prisma.column.findFirst({ where: { id, board: { ownerId: req.user!.id } } });
  if (!column) throw new AppError(404, "Column not found", "NOT_FOUND");
  res.json(await prisma.column.update({ where: { id: column.id }, data: req.body }));
});

columnRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (typeof id !== "string") throw new AppError(400, "Route id is required", "BAD_REQUEST");
  const column = await prisma.column.findFirst({ where: { id, board: { ownerId: req.user!.id } } });
  if (!column) throw new AppError(404, "Column not found", "NOT_FOUND");
  await prisma.column.delete({ where: { id: column.id } });
  res.status(204).send();
});
