import { prisma } from "../config/prisma.js";

type BoardData = {
  title: string;
  description?: string | null | undefined;
};

export const boardRepository = {
  list(ownerId: string, search?: string) {
    return prisma.board.findMany({
      where: {
        ownerId,
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { columns: { include: { tasks: true }, orderBy: { position: "asc" } } },
      orderBy: { updatedAt: "desc" },
    });
  },

  findById(id: string, ownerId: string) {
    return prisma.board.findFirst({
      where: { id, ownerId },
      include: {
        columns: {
          orderBy: { position: "asc" },
          include: {
            tasks: {
              orderBy: { position: "asc" },
              include: { assignedUser: { select: { id: true, name: true, avatar: true } } },
            },
          },
        },
        activities: { orderBy: { createdAt: "desc" }, take: 20 },
      },
    });
  },

  create(ownerId: string, data: BoardData) {
    return prisma.board.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        ownerId,
        columns: {
          create: [
            { title: "Todo", position: 0 },
            { title: "In Progress", position: 1 },
            { title: "Review", position: 2 },
            { title: "Done", position: 3 },
          ],
        },
      },
      include: { columns: true },
    });
  },

  update(id: string, ownerId: string, data: BoardData) {
    return prisma.board.updateMany({
      where: { id, ownerId },
      data: { title: data.title, description: data.description ?? null },
    });
  },

  delete(id: string, ownerId: string) {
    return prisma.board.deleteMany({ where: { id, ownerId } });
  },
};
