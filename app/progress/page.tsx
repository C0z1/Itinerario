"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { getCurrentMonthMilestones } from "@/lib/constants/milestones";
import { AREAS } from "@/lib/constants/habits";

export default function ProgressPage() {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [completedMilestones, setCompletedMilestones] = useState<{
    [key: string]: boolean;
  }>({});
  const [dayVersion, setDayVersion] = useState<"A" | "B">("A");

  useEffect(() => {

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
    <div className="min-h-screen bg-gradient-to-br from-fallout-dark via-fallout-dark to-fallout-darker text-vault-300 pb-24">
      <Header dayVersion={dayVersion} onVersionChange={setDayVersion} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8 text-vault-400 font-fallout tracking-wider prompt">
          PROGRESO · {currentMonth.toUpperCase()} 2026
        </h2>

        <div className="space-y-8">
          {AREAS.map((area) => {
            const areaMilestones = groupedMilestones[area.value];
            const completedCount = areaMilestones.filter(
              (m: any) => completedMilestones[`${m.month}-${m.year}-${m.area}-${m.title}`]
            ).length;

            const areaIcons: { [key: string]: string } = {
              'astrofisica': '🔭',
              'itc': '💻',
              'fisico': '🏋️',
              'japones': '🇯🇵'
            };

            return (
              <div
                key={area.value}
                className="bg-fallout-dark/60 rounded p-6 border-2 border-vault-700/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow hover:border-vault-600/80"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{areaIcons[area.value]}</span>
                  <div>
                    <h3 className="text-lg font-bold text-vault-400 font-fallout tracking-wider">
                      {area.label.toUpperCase()}
                    </h3>
                    <p className="text-xs text-vault-600 font-fallout tracking-widest">
                      {completedCount} / {areaMilestones.length}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4 w-full bg-fallout-dark border-2 border-vault-700/50 rounded h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-vault-500 to-vault-600 h-full transition-all duration-300"
                    style={{ width: `${(completedCount / areaMilestones.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-2">
                  {areaMilestones.map((milestone: any) => {
                    const id = `${milestone.month}-${milestone.year}-${milestone.area}-${milestone.title}`;
                    const isCompleted = completedMilestones[id];

                    return (
                      <label
                        key={id}
                        className="flex items-start gap-3 p-3 bg-fallout-dark/80 border-2 border-vault-600/30 hover:border-vault-600/60 rounded cursor-pointer transition-all group"
                      >
                        <input
                          type="checkbox"
                          checked={isCompleted || false}
                          onChange={() => handleToggleMilestone(id)}
                          className="w-5 h-5 rounded cursor-pointer mt-0.5 accent-vault-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-fallout tracking-wide text-sm ${
                              isCompleted
                                ? "line-through opacity-50 text-vault-500"
                                : "text-vault-300"
                            }`}
                          >
                            {milestone.title}
                          </div>
                          {milestone.description && (
                            <div className="text-xs text-vault-600 font-fallout mt-1">
                              {milestone.description}
                            </div>
                          )}
                        </div>
                        {isCompleted && (
                          <span className="text-radiation-500 font-bold text-sm flex-shrink-0 font-fallout tracking-wider">[✓]</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-fallout-dark/80 border-2 border-vault-700/50 rounded text-sm text-vault-200 font-fallout">
          <p className="text-vault-600 tracking-widest text-xs mb-2">💡 CONSEJO</p>
          <p>Completa los hitos del mes para rastrear tu progreso en el itinerario de 12 meses</p>
        </div>
      </main>

      <BottomNav currentPage="progress" />
    </div>
  );
}
