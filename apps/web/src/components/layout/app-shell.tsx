"use client";

import Link from "next/link";
import { BarChart3, KanbanSquare, LogOut, Moon, Search, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import { GalaxyBackground } from "@/components/galaxy/galaxy-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/store/ui-store";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/boards", label: "Boards", icon: KanbanSquare },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { setTheme, theme } = useTheme();
  const { search, setSearch } = useUiStore();

  return (
    <div className="min-h-screen text-white">
      <GalaxyBackground />
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-white/10 bg-black/24 p-4 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="flex items-center gap-3 px-2 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-cyan-300 font-black text-slate-950">TF</span>
          <span className="text-lg font-semibold">TaskFlow</span>
        </Link>
        <nav className="mt-8 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/74 hover:bg-white/10 hover:text-white"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/38" size={18} />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search boards, tasks, descriptions"
                className="pl-10"
              />
            </div>
            <Button
              variant="ghost"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 px-0 text-white"
            >
              <Moon size={18} />
            </Button>
            <Button variant="ghost" aria-label="Log out" className="w-10 px-0 text-white">
              <LogOut size={18} />
            </Button>
          </div>
        </header>
        <div className="px-4 py-6 sm:px-6">{children}</div>
      </main>
    </div>
  );
}
