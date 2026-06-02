import type { RequestHandler } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/errors.js";
import { verifyAccessToken } from "../utils/tokens.js";
export const requireAuth: RequestHandler = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    const cookieToken = req.cookies?.accessToken;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : cookieToken;
    if (!token) throw new AppError(401, "Authentication required", "UNAUTHORIZED");
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub }, select: { id: true, email: true, name: true, avatar: true } });
    if (!user) throw new AppError(401, "Invalid session", "UNAUTHORIZED");
    req.user = user;
    next();
  } catch (error) { next(error instanceof AppError ? error : new AppError(401, "Invalid or expired token", "UNAUTHORIZED")); }
};
