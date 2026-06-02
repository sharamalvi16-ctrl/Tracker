import type { BoardInput } from "@taskflow/shared";
import { prisma } from "../config/prisma.js";
import { boardRepository } from "../repositories/board.repository.js";
import { notFound } from "../utils/errors.js";
export const boardService = {
  list: (ownerId: string, search?: string) => boardRepository.list(ownerId, search),
  async get(id: string, ownerId: string) { const board = await boardRepository.findById(id, ownerId); if (!board) throw notFound("Board"); return board; },
  async create(ownerId: string, input: BoardInput) { const board = await boardRepository.create(ownerId, input); await prisma.activity.create({ data: { action: "CREATED", message: `Created board ${board.title}`, boardId: board.id, actorId: ownerId } }); return board; },
  update: (id: string, ownerId: string, input: BoardInput) => boardRepository.update(id, ownerId, input),
  delete: (id: string, ownerId: string) => boardRepository.delete(id, ownerId),
};
