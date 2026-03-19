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
    { href: "/today", label: "HOY", id: "today", icon: "▦", menu: "1" },
    { href: "/tasks", label: "TAREAS", id: "tasks", icon: "☑", menu: "2" },
    { href: "/progress", label: "PROGRESO", id: "progress", icon: "⊞", menu: "3" },
    { href: "/log", label: "LOG", id: "log", icon: "≣", menu: "4" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950 to-gray-950/95 border-t-2 border-green-700 md:hidden backdrop-blur-sm">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center py-4 text-xs font-semibold font-fallout tracking-widest transition-all duration-200 relative ${
              current === item.id
                ? "text-green-400"
                : "text-green-600 hover:text-green-500"
            }`}
          >
            {current === item.id && (
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full" />
            )}
            <span className="text-lg mb-1.5 opacity-80">{item.icon}</span>
            <div className="flex items-center gap-1">
              <span className="text-green-500 text-xs font-bold">{item.menu}.</span>
              <span className="text-xs">{item.label}</span>
            </div>
            {current === item.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-green-400 to-green-500" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
