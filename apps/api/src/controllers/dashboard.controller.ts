import type { RequestHandler } from "express";
import { prisma } from "../config/prisma.js";

export const dashboardController = {
  summary: (async (req, res) => {
    const ownerId = req.user!.id;
    const [totalTasks, completedTasks, overdueTasks, activeBoards, statusGroups] = await Promise.all([
      prisma.task.count({ where: { column: { board: { ownerId } } } }),
      prisma.task.count({ where: { status: "DONE", column: { board: { ownerId } } } }),
      prisma.task.count({
        where: { dueDate: { lt: new Date() }, status: { not: "DONE" }, column: { board: { ownerId } } },
      }),
      prisma.board.count({ where: { ownerId } }),
      prisma.task.groupBy({ by: ["status"], where: { column: { board: { ownerId } } }, _count: true }),
    ]);

    res.json({
      totalTasks,
      completedTasks,
      overdueTasks,
      activeBoards,
      statusDistribution: statusGroups.map((group) => ({ status: group.status, count: group._count })),
      completionTrend: [
        { day: "Mon", completed: 3 },
        { day: "Tue", completed: 5 },
        { day: "Wed", completed: 4 },
        { day: "Thu", completed: 8 },
        { day: "Fri", completed: 7 },
      ],
    });
  }) satisfies RequestHandler,
};
