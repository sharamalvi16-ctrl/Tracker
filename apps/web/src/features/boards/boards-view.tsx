"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const boards = [
  { id: "demo", title: "Launch Galaxy UI", description: "Design, API, auth, tests, deploy", tasks: 18, done: 7 },
  { id: "growth", title: "Growth Experiments", description: "Acquisition loops and activation", tasks: 11, done: 4 },
  { id: "ops", title: "Operations", description: "Hiring, runbooks, support quality", tasks: 23, done: 13 },
];

export function BoardsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Workspaces</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Boards</h1>
        </div>
        <Button>
          <Plus size={18} /> New board
        </Button>
      </div>
      <div className="glass flex items-center gap-3 rounded-lg p-3">
        <Search size={18} className="text-white/42" />
        <Input placeholder="Filter boards by name, owner, or status" className="border-0 bg-transparent" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {boards.map((board, index) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Link href={`/boards/${board.id}`} className="glass block rounded-lg p-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold">{board.title}</h2>
                <CalendarDays size={18} className="text-cyan-200" />
              </div>
              <p className="mt-3 min-h-12 text-sm text-white/62">{board.description}</p>
              <div className="mt-6 h-2 overflow-hidden rounded bg-white/10">
                <div className="h-full bg-cyan-300" style={{ width: `${(board.done / board.tasks) * 100}%` }} />
              </div>
              <p className="mt-3 text-sm text-white/58">
                {board.done} of {board.tasks} tasks complete
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
