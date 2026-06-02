import { z } from "zod";

export const prioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
export const statusSchema = z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]);
export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(10).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
});
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export const boardSchema = z.object({ title: z.string().min(2).max(120), description: z.string().max(500).optional().nullable() });
export const columnSchema = z.object({ title: z.string().min(2).max(80), position: z.number().int().nonnegative(), boardId: z.string().cuid() });
export const taskSchema = z.object({
  title: z.string().min(2).max(160),
  description: z.string().max(5000).optional().nullable(),
  priority: prioritySchema.default("MEDIUM"),
  dueDate: z.string().datetime().optional().nullable(),
  status: statusSchema.default("TODO"),
  position: z.number().int().nonnegative().default(0),
  columnId: z.string().cuid(),
  assignedUserId: z.string().cuid().optional().nullable(),
  labels: z.array(z.string().min(1).max(32)).default([]),
});
export const moveTaskSchema = z.object({ columnId: z.string().cuid(), position: z.number().int().nonnegative() });
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type BoardInput = z.infer<typeof boardSchema>;
export type ColumnInput = z.infer<typeof columnSchema>;
export type TaskInput = z.infer<typeof taskSchema>;
export type MoveTaskInput = z.infer<typeof moveTaskSchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type TaskStatus = z.infer<typeof statusSchema>;
