import type { Prisma } from "@prisma/client";
import type { MoveTaskInput, TaskInput } from "@taskflow/shared";
import { prisma } from "../config/prisma.js";
import { taskRepository } from "../repositories/task.repository.js";
import { AppError, notFound } from "../utils/errors.js";

type TaskFilters = {
  q?: string | undefined;
  priority?: string | undefined;
  status?: string | undefined;
};

export const taskService = {
  list: (ownerId: string, filters: TaskFilters) => taskRepository.list(ownerId, filters),

  async get(id: string, ownerId: string) {
    const task = await taskRepository.findById(id, ownerId);
    if (!task) throw notFound("Task");
    return task;
  },

  async create(ownerId: string, input: TaskInput) {
    const column = await prisma.column.findFirst({ where: { id: input.columnId, board: { ownerId } } });
    if (!column) throw new AppError(403, "Column is not available", "FORBIDDEN");

    const data: Prisma.TaskUncheckedCreateInput = {
      title: input.title,
      description: input.description ?? null,
      priority: input.priority,
      dueDate: input.dueDate ? new Date(input.dueDate) : null,
      status: input.status,
      position: input.position,
      columnId: input.columnId,
      assignedUserId: input.assignedUserId ?? null,
      labels: input.labels,
    };

    const task = await taskRepository.create(data);
    await prisma.activity.create({
      data: {
        action: "CREATED",
        message: `Created task ${task.title}`,
        taskId: task.id,
        boardId: task.column.boardId,
        actorId: ownerId,
      },
    });

    return task;
  },

  update: (id: string, ownerId: string, input: Partial<TaskInput>) => {
    const data: Prisma.TaskUncheckedUpdateInput = {};
    if (input.title !== undefined) data.title = input.title;
    if (input.description !== undefined) data.description = input.description;
    if (input.priority !== undefined) data.priority = input.priority;
    if (input.status !== undefined) data.status = input.status;
    if (input.position !== undefined) data.position = input.position;
    if (input.columnId !== undefined) data.columnId = input.columnId;
    if (input.assignedUserId !== undefined) data.assignedUserId = input.assignedUserId;
    if (input.labels !== undefined) data.labels = input.labels;
    if (input.dueDate !== undefined) data.dueDate = input.dueDate ? new Date(input.dueDate) : null;
    return taskRepository.update(id, ownerId, data);
  },

  async move(id: string, ownerId: string, input: MoveTaskInput) {
    const column = await prisma.column.findFirst({ where: { id: input.columnId, board: { ownerId } } });
    if (!column) throw new AppError(403, "Column is not available", "FORBIDDEN");
    return taskRepository.update(id, ownerId, input);
  },

  delete: (id: string, ownerId: string) => taskRepository.delete(id, ownerId),
};
