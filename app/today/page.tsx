"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PipboyFrame } from "@/components/layout/PipboyFrame";
import { HabitChecklist } from "@/components/today/HabitChecklist";
import { QuickLogInput } from "@/components/today/QuickLogInput";
import { AreaDetailsModal } from "@/components/today/AreaDetailsModal";
import { DailyPlan } from "@/components/today/DailyPlan";

export default function TodayPage() {
  const [mounted, setMounted] = useState(false);
  const [dayVersion, setDayVersion] = useState<"A" | "B">("A");
  const [habitCompletion, setHabitCompletion] = useState(0);
  const [tasksPending, setTasksPending] = useState(0);
  const [selectedArea, setSelectedArea] = useState<"astrofisica" | "itc" | "fisico" | "japones" | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("dayVersion");
    if (saved) {
      setDayVersion(saved as "A" | "B");
    }

    // Calculate habit completion
    const today = new Date().toISOString().split("T")[0];
    const habitsStr = localStorage.getItem(`habits-${today}`);
    if (habitsStr) {
      try {
        const habits = JSON.parse(habitsStr);
        const completed = habits.filter((h: any) => h.completed).length;
        const percentage = Math.round((completed / habits.length) * 100);
        setHabitCompletion(percentage);
      } catch (e) {
        setHabitCompletion(0);
      }
    }

    // Calculate pending tasks
    const tasksStr = localStorage.getItem("tasks");
    if (tasksStr) {
      try {
        const tasks = JSON.parse(tasksStr);
        const pending = tasks.filter((t: any) => !t.completed).length;
        setTasksPending(pending);
      } catch (e) {
        setTasksPending(0);
      }
    }
  }, []);

  if (!mounted) return null;

  const today = new Date();
  const days = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const monthName = months[today.getMonth()];

  return (
    <div className="min-h-screen bg-gray-950 pb-24 md:pb-0">
      <PipboyFrame habitCompletion={habitCompletion} tasksPending={tasksPending}>
        <div className="space-y-6 p-4">
          {/* Header info */}
          <div className="border-b-2 border-green-800/50 pb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xl font-bold tracking-wide text-green-400 font-fallout">
                  {dayName} {date} {monthName}
                </div>
                <div className="text-xs text-green-700 mt-2 tracking-wider font-fallout">BITÁCORA PERSONAL</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setDayVersion("A");
                    localStorage.setItem("dayVersion", "A");
                  }}
                  className={`px-3 py-1 text-sm font-bold tracking-widest transition-all ${
                    dayVersion === "A"
                      ? "bg-green-600 text-black shadow-lg shadow-green-600/50"
                      : "bg-gray-800 text-green-600 hover:bg-gray-700"
                  }`}
                >
                  [ A ]
                </button>
                <button
                  onClick={() => {
                    setDayVersion("B");
                    localStorage.setItem("dayVersion", "B");
                  }}
                  className={`px-3 py-1 text-sm font-bold tracking-widest transition-all ${
                    dayVersion === "B"
                      ? "bg-green-600 text-black shadow-lg shadow-green-600/50"
                      : "bg-gray-800 text-green-600 hover:bg-gray-700"
                  }`}
                >
                  [ B ]
                </button>
              </div>
            </div>
          </div>

          {/* Plan del Día */}
          <section>
            <h2 className="text-lg font-bold mb-3 text-green-400 tracking-wider font-fallout">
              ▬ PLAN DEL DÍA
            </h2>
            <DailyPlan dayVersion={dayVersion} />
          </section>

          {/* Hábitos */}
          <section>
            <h2 className="text-lg font-bold mb-3 text-green-400 tracking-wider font-fallout">
              ▬ HÁBITOS
            </h2>
            <HabitChecklist />
          </section>

          {/* Log del día */}
          <section>
            <h2 className="text-lg font-bold mb-3 text-green-400 tracking-wider font-fallout">
              ▬ REGISTRO
            </h2>
            <QuickLogInput />
          </section>

          {/* Areas Overview */}
          <section>
            <h2 className="text-lg font-bold mb-3 text-green-400 tracking-wider font-fallout">
              ▬ ÁREAS DE ESTUDIO
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedArea("astrofisica")}
                className="p-4 bg-gray-900/50 border-2 border-green-700/50 hover:border-green-600 hover:bg-gray-900/70 rounded transition-all duration-200 text-left group"
              >
                <div className="text-sm font-bold text-green-400 group-hover:text-green-300 font-fallout tracking-wider">
                  ASTROFÍSICA
                </div>
                <div className="text-xs text-green-700 mt-2 group-hover:text-green-600">Ver curriculum</div>
              </button>

              <button
                onClick={() => setSelectedArea("itc")}
                className="p-4 bg-gray-900/50 border-2 border-green-700/50 hover:border-green-600 hover:bg-gray-900/70 rounded transition-all duration-200 text-left group"
              >
                <div className="text-sm font-bold text-green-400 group-hover:text-green-300 font-fallout tracking-wider">
                  TECNOLOGÍA
                </div>
                <div className="text-xs text-green-700 mt-2 group-hover:text-green-600">Ver curriculum</div>
              </button>

              <button
                onClick={() => setSelectedArea("fisico")}
                className="p-4 bg-gray-900/50 border-2 border-green-700/50 hover:border-green-600 hover:bg-gray-900/70 rounded transition-all duration-200 text-left group"
              >
                <div className="text-sm font-bold text-green-400 group-hover:text-green-300 font-fallout tracking-wider">
                  ENTRENAMIENTO
                </div>
                <div className="text-xs text-green-700 mt-2 group-hover:text-green-600">Ver programa</div>
              </button>

              <button
                onClick={() => setSelectedArea("japones")}
                className="p-4 bg-gray-900/50 border-2 border-green-700/50 hover:border-green-600 hover:bg-gray-900/70 rounded transition-all duration-200 text-left group"
              >
                <div className="text-sm font-bold text-green-400 group-hover:text-green-300 font-fallout tracking-wider">
                  IDIOMA
                </div>
                <div className="text-xs text-green-700 mt-2 group-hover:text-green-600">Ver curriculum</div>
              </button>
            </div>
          </section>
        </div>
      </PipboyFrame>

      <AreaDetailsModal area={selectedArea} onClose={() => setSelectedArea(null)} />
      <BottomNav currentPage="today" />
    </div>
  );
}
