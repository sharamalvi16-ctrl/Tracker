"use client";

import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { motion } from "framer-motion";
import { CheckCircle2, Clock3, KanbanSquare, ListTodo } from "lucide-react";

const trend = [
  { day: "Mon", completed: 3 },
  { day: "Tue", completed: 5 },
  { day: "Wed", completed: 4 },
  { day: "Thu", completed: 8 },
  { day: "Fri", completed: 7 },
];

const status = [
  { name: "Todo", value: 12, color: "#22d3ee" },
  { name: "Progress", value: 8, color: "#f472b6" },
  { name: "Review", value: 5, color: "#facc15" },
  { name: "Done", value: 19, color: "#34d399" },
];

export function DashboardView() {
  const metrics = [
    { label: "Total Tasks", value: "44", icon: ListTodo },
    { label: "Completed", value: "19", icon: CheckCircle2 },
    { label: "Overdue", value: "3", icon: Clock3 },
    { label: "Active Boards", value: "6", icon: KanbanSquare },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Mission control</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="glass rounded-lg p-5"
          >
            <metric.icon className="text-cyan-200" size={22} />
            <p className="mt-5 text-3xl font-semibold">{metric.value}</p>
            <p className="text-sm text-white/58">{metric.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <section className="glass rounded-lg p-5">
          <h2 className="text-lg font-semibold">Completion trend</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <XAxis dataKey="day" stroke="rgba(255,255,255,.48)" />
                <Tooltip contentStyle={{ background: "#081020", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="completed" stroke="#22d3ee" fill="rgba(34,211,238,.22)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="glass rounded-lg p-5">
          <h2 className="text-lg font-semibold">Status distribution</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={status} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={4}>
                  {status.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#081020", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
