import { prisma } from "../config/prisma.js";
export const userRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  findPublicById: (id: string) => prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, avatar: true, createdAt: true } }),
  create: (data: { name: string; email: string; password: string }) => prisma.user.create({ data }),
};
