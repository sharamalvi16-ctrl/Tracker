import type { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";

type TaskFilters = {
  q?: string | undefined;
  priority?: string | undefined;
  status?: string | undefined;
};

export const taskRepository = {
  list(ownerId: string, filters: TaskFilters) {
    return prisma.task.findMany({
      where: {
        column: { board: { ownerId } },
        ...(filters.q
          ? {
              OR: [
                { title: { contains: filters.q, mode: "insensitive" } },
                { description: { contains: filters.q, mode: "insensitive" } },
                { column: { board: { title: { contains: filters.q, mode: "insensitive" } } } },
              ],
            }
          : {}),
        ...(filters.priority ? { priority: filters.priority as Prisma.EnumPriorityFilter<"Task"> } : {}),
        ...(filters.status ? { status: filters.status as Prisma.EnumTaskStatusFilter<"Task"> } : {}),
      },
      include: {
        column: { include: { board: true } },
        assignedUser: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: [{ dueDate: "asc" }, { updatedAt: "desc" }],
    });
  },

  findById(id: string, ownerId: string) {
    return prisma.task.findFirst({
      where: { id, column: { board: { ownerId } } },
      include: {
        comments: true,
        activities: true,
        assignedUser: { select: { id: true, name: true, avatar: true } },
      },
    });
  },

  create(data: Prisma.TaskUncheckedCreateInput) {
    return prisma.task.create({ data, include: { column: { include: { board: true } } } });
  },

  update(id: string, ownerId: string, data: Prisma.TaskUncheckedUpdateInput) {
    return prisma.task.updateMany({ where: { id, column: { board: { ownerId } } }, data });
  },

  delete(id: string, ownerId: string) {
    return prisma.task.deleteMany({ where: { id, column: { board: { ownerId } } } });
  },
};
