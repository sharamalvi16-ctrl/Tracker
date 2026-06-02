import type { Request, RequestHandler } from "express";
import { taskService } from "../services/task.service.js";
import { AppError } from "../utils/errors.js";

const userId = (req: Request) => req.user!.id;
const routeId = (req: Request) => {
  const id = req.params.id;
  if (typeof id !== "string") throw new AppError(400, "Route id is required", "BAD_REQUEST");
  return id;
};
const queryString = (value: unknown) => (typeof value === "string" ? value : undefined);

export const taskController = {
  list: (async (req, res) => {
    res.json(
      await taskService.list(
        userId(req),
        Object.fromEntries(
          Object.entries({
            q: queryString(req.query.q),
            priority: queryString(req.query.priority),
            status: queryString(req.query.status),
          }).filter(([, value]) => value !== undefined),
        ),
      ),
    );
  }) satisfies RequestHandler,
  get: (async (req, res) => {
    res.json(await taskService.get(routeId(req), userId(req)));
  }) satisfies RequestHandler,
  create: (async (req, res) => {
    res.status(201).json(await taskService.create(userId(req), req.body));
  }) satisfies RequestHandler,
  update: (async (req, res) => {
    res.json(await taskService.update(routeId(req), userId(req), req.body));
  }) satisfies RequestHandler,
  move: (async (req, res) => {
    res.json(await taskService.move(routeId(req), userId(req), req.body));
  }) satisfies RequestHandler,
  delete: (async (req, res) => {
    await taskService.delete(routeId(req), userId(req));
    res.status(204).send();
  }) satisfies RequestHandler,
};
