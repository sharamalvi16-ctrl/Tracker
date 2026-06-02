"use client";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { CalendarClock, GripVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns = [
  {
    id: "todo",
    title: "Todo",
    tasks: [
      { id: "1", title: "Build register and login flows", priority: "HIGH", due: "Jun 04" },
      { id: "2", title: "Add global search with debounce", priority: "MEDIUM", due: "Jun 07" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    tasks: [{ id: "3", title: "Persist drag and drop positions", priority: "URGENT", due: "Today" }],
  },
  { id: "review", title: "Review", tasks: [{ id: "4", title: "Security middleware audit", priority: "HIGH", due: "Jun 05" }] },
  { id: "done", title: "Done", tasks: [{ id: "5", title: "Prisma model relationships", priority: "LOW", due: "Done" }] },
];

export function BoardView({ id }: { id: string }) {
  function handleDragEnd(_event: DragEndEvent) {
    // PATCH /api/tasks/:id/move persists cross-column movement in the API layer.
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Board {id}</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Launch Galaxy UI</h1>
        </div>
        <Button>
          <Plus size={18} /> New task
        </Button>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((column) => (
            <section key={column.id} className="min-h-96 rounded-lg border border-white/10 bg-black/18 p-3 backdrop-blur-lg">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="font-semibold">{column.title}</h2>
                <span className="rounded bg-white/10 px-2 py-1 text-xs text-white/62">{column.tasks.length}</span>
              </div>
              <SortableContext items={column.tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {column.tasks.map((task, index) => (
                    <motion.article
                      key={task.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="rounded-lg border border-white/10 bg-white/[0.07] p-4 shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold leading-5">{task.title}</h3>
                        <GripVertical size={16} className="shrink-0 text-white/38" />
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs">
                        <span className="rounded bg-cyan-300/14 px-2 py-1 text-cyan-100">{task.priority}</span>
                        <span className="flex items-center gap-1 text-white/52">
                          <CalendarClock size={14} /> {task.due}
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </SortableContext>
            </section>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
