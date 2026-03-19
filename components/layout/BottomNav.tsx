"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  currentPage?: string;
}

export function BottomNav({ currentPage }: BottomNavProps) {
  const pathname = usePathname();
  const current = currentPage || pathname.split("/")[1] || "today";

  const navItems = [
    { href: "/today", label: "Hoy", icon: "📅", id: "today" },
    { href: "/tasks", label: "Tareas", icon: "✓", id: "tasks" },
    { href: "/progress", label: "Progreso", icon: "📊", id: "progress" },
    { href: "/log", label: "Log", icon: "📖", id: "log" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 md:hidden">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center py-3 text-sm font-medium transition-colors ${
              current === item.id
                ? "bg-slate-800 text-blue-400 border-t-2 border-blue-400"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <span className="text-lg mb-1">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
