"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { HabitChecklist } from "@/components/today/HabitChecklist";
import { ScheduleTimeline } from "@/components/today/ScheduleTimeline";
import { QuickLogInput } from "@/components/today/QuickLogInput";

export default function TodayPage() {
  const [mounted, setMounted] = useState(false);
  const [dayVersion, setDayVersion] = useState<"A" | "B">("A");

  useEffect(() => {
    setMounted(true);
    // Load saved day version from localStorage for now
    const saved = localStorage.getItem("dayVersion");
    if (saved) {
      setDayVersion(saved as "A" | "B");
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <Header dayVersion={dayVersion} onVersionChange={setDayVersion} />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Hábitos */}
        <section className="bg-slate-900 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📋</span> Hábitos de Hoy
          </h2>
          <HabitChecklist />
        </section>

        {/* Horario */}
        <section className="bg-slate-900 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🕐</span> Horario (Versión {dayVersion})
          </h2>
          <ScheduleTimeline dayVersion={dayVersion} />
        </section>

        {/* Log del día */}
        <section className="bg-slate-900 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📝</span> Log del Día
          </h2>
          <QuickLogInput />
        </section>
      </main>

      <BottomNav currentPage="today" />
    </div>
  );
}
