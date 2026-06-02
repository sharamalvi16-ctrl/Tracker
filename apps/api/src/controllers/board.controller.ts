import type { Request, RequestHandler } from "express";
import { boardService } from "../services/board.service.js";
import { AppError } from "../utils/errors.js";

const userId = (req: Request) => req.user!.id;
const routeId = (req: Request) => {
  const id = req.params.id;
  if (typeof id !== "string") throw new AppError(400, "Route id is required", "BAD_REQUEST");
  return id;
};

export const boardController = {
  list: (async (req, res) => {
    res.json(await boardService.list(userId(req), req.query.search as string | undefined));
  }) satisfies RequestHandler,
  get: (async (req, res) => {
    res.json(await boardService.get(routeId(req), userId(req)));
  }) satisfies RequestHandler,
  create: (async (req, res) => {
    res.status(201).json(await boardService.create(userId(req), req.body));
  }) satisfies RequestHandler,
  update: (async (req, res) => {
    res.json(await boardService.update(routeId(req), userId(req), req.body));
  }) satisfies RequestHandler,
  delete: (async (req, res) => {
    await boardService.delete(routeId(req), userId(req));
    res.status(204).send();
  }) satisfies RequestHandler,
};
