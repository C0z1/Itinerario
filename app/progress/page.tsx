"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { getCurrentMonthMilestones } from "@/lib/constants/milestones";
import { AREAS } from "@/lib/constants/habits";

interface MilestoneStatus {
  id: string;
  completed: boolean;
}

export default function ProgressPage() {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [completedMilestones, setCompletedMilestones] = useState<{
    [key: string]: boolean;
  }>({});
  const [mounted, setMounted] = useState(false);
  const [dayVersion, setDayVersion] = useState<"A" | "B">("A");

  useEffect(() => {
    setMounted(true);

    // Load milestones for current month
    const currentMilestones = getCurrentMonthMilestones();
    setMilestones(currentMilestones);

    // Load completed milestones from localStorage
    const saved = localStorage.getItem("completedMilestones");
    if (saved) {
      setCompletedMilestones(JSON.parse(saved));
    }

    // Load day version
    const savedVersion = localStorage.getItem("dayVersion");
    if (savedVersion) {
      setDayVersion(savedVersion as "A" | "B");
    }
  }, []);

  const handleToggleMilestone = (id: string) => {
    const updated = { ...completedMilestones };
    updated[id] = !updated[id];
    setCompletedMilestones(updated);
    localStorage.setItem("completedMilestones", JSON.stringify(updated));
  };

  if (!mounted) return null;

  const now = new Date();
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const currentMonth = monthNames[now.getMonth()];

  // Group milestones by area
  const groupedMilestones = AREAS.reduce((acc: any, area) => {
    acc[area.value] = milestones.filter((m) => m.area === area.value);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <Header dayVersion={dayVersion} onVersionChange={setDayVersion} />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">
          Progreso - {currentMonth} 2026
        </h2>

        <div className="space-y-6">
          {AREAS.map((area) => {
            const areaMilestones = groupedMilestones[area.value];
            const completedCount = areaMilestones.filter(
              (m: any) => completedMilestones[`${m.month}-${m.year}-${m.area}-${m.title}`]
            ).length;

            return (
              <div
                key={area.value}
                className="bg-slate-900 rounded-lg p-6 border border-slate-700"
              >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">{AREAS.find(a => a.value === area.value)?.value === 'astrofisica' ? '🔭' : area.value === 'itc' ? '💻' : area.value === 'fisico' ? '🏋️' : '🇯🇵'}</span>
                  {area.label}
                </h3>

                <div className="text-sm text-slate-400 mb-4">
                  {completedCount} de {areaMilestones.length} completados
                </div>

                <div className="space-y-3">
                  {areaMilestones.map((milestone: any) => {
                    const id = `${milestone.month}-${milestone.year}-${milestone.area}-${milestone.title}`;
                    const isCompleted = completedMilestones[id];

                    return (
                      <label
                        key={id}
                        className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors group"
                      >
                        <input
                          type="checkbox"
                          checked={isCompleted || false}
                          onChange={() => handleToggleMilestone(id)}
                          className="w-5 h-5 rounded cursor-pointer mt-1"
                        />
                        <div className="flex-1">
                          <div
                            className={
                              isCompleted
                                ? "line-through text-slate-500"
                                : "text-white"
                            }
                          >
                            {milestone.title}
                          </div>
                          {milestone.description && (
                            <div className="text-sm text-slate-400">
                              {milestone.description}
                            </div>
                          )}
                        </div>
                        {isCompleted && (
                          <span className="text-green-400 font-bold">✓</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-slate-800 border border-slate-600 rounded-lg text-sm text-slate-300">
          💡 Completa los hitos del mes para rastrear tu progreso en el itinerario
        </div>
      </main>

      <BottomNav currentPage="progress" />
    </div>
  );
}
