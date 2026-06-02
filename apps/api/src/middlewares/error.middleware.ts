import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/errors.js";
export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) return res.status(422).json({ error: "VALIDATION_ERROR", message: "Request validation failed", details: error.flatten() });
  if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.code, message: error.message });
  console.error(error);
  return res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: "Unexpected server error" });
};
