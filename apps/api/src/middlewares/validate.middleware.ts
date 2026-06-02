import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";
import { clean } from "../utils/sanitize.js";
export const validate = (schema: ZodSchema, source: "body" | "query" | "params" = "body"): RequestHandler => (req, _res, next) => { req[source] = schema.parse(clean(req[source])); next(); };
