import type { RequestHandler, Response } from "express";
import { env } from "../config/env.js";
import { authService } from "../services/auth.service.js";

type Session = Awaited<ReturnType<typeof authService.login>>;

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  signed: true,
};

function attachSession(res: Response, session: Session) {
  res.cookie("accessToken", session.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  res.cookie("refreshToken", session.refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
  return res.json(session);
}

export const authController = {
  register: (async (req, res) => attachSession(res, await authService.register(req.body))) satisfies RequestHandler,
  login: (async (req, res) => attachSession(res, await authService.login(req.body))) satisfies RequestHandler,
  refresh: (async (req, res) => attachSession(res, await authService.refresh(req.signedCookies.refreshToken))) satisfies RequestHandler,
  logout: (async (req, res) => {
    await authService.logout(req.signedCookies.refreshToken);
    res.clearCookie("accessToken").clearCookie("refreshToken").status(204).send();
  }) satisfies RequestHandler,
  me: ((req, res) => res.json({ user: req.user })) satisfies RequestHandler,
};
