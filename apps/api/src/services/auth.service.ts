import bcrypt from "bcryptjs";
import type { LoginInput, RegisterInput } from "@taskflow/shared";
import { prisma } from "../config/prisma.js";
import { userRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/errors.js";
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";

const refreshExpiry = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const authService = {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email.toLowerCase());
    if (existing) throw new AppError(409, "Email is already registered", "EMAIL_EXISTS");

    const user = await userRepository.create({
      name: input.name,
      email: input.email.toLowerCase(),
      password: await bcrypt.hash(input.password, 12),
    });

    return this.issueSession(user.id, user.email);
  },

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email.toLowerCase());
    if (!user) throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");

    return this.issueSession(user.id, user.email);
  },

  async issueSession(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: hashToken(refreshToken),
        expiresAt: refreshExpiry(),
      },
    });

    const user = await userRepository.findPublicById(userId);
    return { user, accessToken, refreshToken };
  },

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const stored = await prisma.refreshToken.findUnique({ where: { tokenHash: hashToken(refreshToken) } });
    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new AppError(401, "Refresh token is invalid", "UNAUTHORIZED");
    }

    return this.issueSession(payload.sub, payload.email);
  },

  async logout(refreshToken?: string) {
    if (!refreshToken) return;
    await prisma.refreshToken.updateMany({
      where: { tokenHash: hashToken(refreshToken), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },
};
