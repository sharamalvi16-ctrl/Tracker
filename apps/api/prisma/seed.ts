import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const password = await bcrypt.hash("TaskFlow123!", 12);
  const user = await prisma.user.upsert({ where: { email: "demo@taskflow.dev" }, update: {}, create: { name: "Demo Founder", email: "demo@taskflow.dev", password, avatar: "https://api.dicebear.com/8.x/initials/svg?seed=DF" } });
  const board = await prisma.board.create({ data: { title: "Launch Galaxy UI", description: "A production TaskFlow board with smooth motion and crisp execution.", ownerId: user.id, columns: { create: [
    { title: "Todo", position: 0, tasks: { create: [{ title: "Wire protected dashboard", description: "Create authenticated dashboard shell and metrics.", priority: "HIGH", status: "TODO", position: 0, labels: ["frontend", "auth"], assignedUserId: user.id }] } },
    { title: "In Progress", position: 1, tasks: { create: [{ title: "Finalize Prisma schema", priority: "URGENT", status: "IN_PROGRESS", position: 0, labels: ["database"], assignedUserId: user.id }] } },
    { title: "Review", position: 2 },
    { title: "Done", position: 3, tasks: { create: [{ title: "Define TaskFlow architecture", priority: "MEDIUM", status: "DONE", position: 0, labels: ["architecture"], assignedUserId: user.id }] } }
  ] } } });
  await prisma.activity.create({ data: { action: "CREATED", message: "Seeded launch board and starter workflow.", boardId: board.id, actorId: user.id } });
}
main().catch(async (error) => { console.error(error); process.exit(1); }).finally(async () => prisma.$disconnect());
