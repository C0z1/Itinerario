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
  const [dayVersion, setDayVersion] = useState<"A" | "B">("A");

  useEffect(() => {

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-fallout-dark via-fallout-dark to-fallout-darker text-vault-300 pb-24">
      <Header dayVersion={dayVersion} onVersionChange={setDayVersion} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8 text-vault-400 font-fallout tracking-wider prompt">
          HISTORIAL · ÚLTIMOS 30 DÍAS
        </h2>

        <div className="space-y-3">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-vault-600 font-fallout">
              SIN REGISTROS AÚN
            </div>
          ) : (
            entries.map((entry, idx) => (
              <div
                key={idx}
                className="bg-fallout-dark/60 rounded p-5 border-2 border-vault-700/50 hover:border-vault-600/80 transition-all hover:shadow-xl group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-vault-300 font-fallout tracking-wide">
                      {entry.date}
                    </div>
                    <div className="text-xs text-vault-600 font-fallout tracking-widest mt-1">
                      {entry.completedHabits}/{entry.totalHabits} HÁBITOS · VER. {entry.dayVersion}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-bold text-vault-400 font-fallout">
                      {entry.completedHabits}
                    </div>
                    <div className="text-xs text-vault-600 font-fallout tracking-widest">
                      {entry.completedHabits === entry.totalHabits ? "✓ COMPLETO" : "PARCIAL"}
                    </div>
                  </div>
                </div>

                {entry.content && (
                  <div className="mt-4 pt-4 border-t border-vault-700/50 text-sm text-vault-200 font-fallout leading-relaxed italic">
                    <p className="text-vault-600 text-xs tracking-widest mb-2">NOTA DEL DÍA</p>
                    <p>
                      "{entry.content.substring(0, 120)}
                      {entry.content.length > 120 ? "..." : ""}"
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-8 p-4 bg-fallout-dark/80 border-2 border-vault-700/50 rounded text-sm text-vault-200 font-fallout">
          <p className="text-vault-600 tracking-widest text-xs mb-2">📋 INFORMACIÓN</p>
          <p>Revisa tu historial diario para rastrear tu evolución en los últimos 30 días</p>
        </div>
      </main>

      <BottomNav currentPage="log" />
    </div>
  );
}
