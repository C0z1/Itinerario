"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";

interface LogEntry {
  date: string;
  dayVersion: "A" | "B";
  completedHabits: number;
  totalHabits: number;
  content?: string;
}

export default function LogPage() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [dayVersion, setDayVersion] = useState<"A" | "B">("A");

  useEffect(() => {
    setMounted(true);

    // Generate log entries from localStorage
    const logs: LogEntry[] = [];
    const days = 30; // Show last 30 days

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const formattedDate = date.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

      const habitsStr = localStorage.getItem(`habits-${dateStr}`);
      const habits = habitsStr ? JSON.parse(habitsStr) : [];
      const completedCount = habits.filter((h: any) => h.completed).length;

      const savedVersion = localStorage.getItem(`dayVersion-${dateStr}`);
      const ver = (savedVersion || "A") as "A" | "B";

      const content = localStorage.getItem(`log-${dateStr}`);

      logs.push({
        date: formattedDate,
        dayVersion: ver,
        completedHabits: completedCount,
        totalHabits: 6,
        content: content || undefined,
      });
    }

    setEntries(logs);

    // Load day version
    const savedVersion = localStorage.getItem("dayVersion");
    if (savedVersion) {
      setDayVersion(savedVersion as "A" | "B");
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <Header dayVersion={dayVersion} onVersionChange={setDayVersion} />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Historial</h2>

        <div className="space-y-3">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No hay registros aún
            </div>
          ) : (
            entries.map((entry, idx) => (
              <div
                key={idx}
                className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold">{entry.date}</div>
                    <div className="text-sm text-slate-400">
                      {entry.completedHabits}/{entry.totalHabits} hábitos · Ver.
                      {entry.dayVersion}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">
                      {entry.completedHabits}
                    </div>
                    <div className="text-xs text-slate-500">completados</div>
                  </div>
                </div>

                {entry.content && (
                  <div className="mt-3 pt-3 border-t border-slate-700 text-sm text-slate-300">
                    "{entry.content.substring(0, 100)}
                    {entry.content.length > 100 ? "..." : ""}"
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <BottomNav currentPage="log" />
    </div>
  );
}
