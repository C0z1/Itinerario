"use client";

import { useEffect, useState } from "react";
import {
  ASTROPHYSICS_MILESTONES,
  ITC_MILESTONES,
  JAPANESE_MILESTONES,
  PHYSICAL_TRAINING,
  DAILY_HABITS,
} from "@/lib/constants/itinerary";

interface AreaDetailsModalProps {
  area: "astrofisica" | "itc" | "fisico" | "japones" | null;
  onClose: () => void;
}

export function AreaDetailsModal({ area, onClose }: AreaDetailsModalProps) {
  const [currentMonth, setCurrentMonth] = useState(1);

  useEffect(() => {
    const now = new Date();
    setCurrentMonth(Math.min(12, now.getMonth() + 1));
  }, []);

  if (!area) return null;

  const getAreaTitle = () => {
    switch (area) {
      case "astrofisica":
        return "ASTROFÍSICA";
      case "itc":
        return "TECNOLOGÍA";
      case "fisico":
        return "ENTRENAMIENTO";
      case "japones":
        return "IDIOMA";
      default:
        return "ÁREA";
    }
  };

  const getMilestoneData = () => {
    switch (area) {
      case "astrofisica":
        return ASTROPHYSICS_MILESTONES[Math.max(0, currentMonth - 1)];
      case "itc":
        return ITC_MILESTONES[Math.max(0, currentMonth - 1)];
      case "japones":
        return JAPANESE_MILESTONES[Math.max(0, currentMonth - 1)];
      default:
        return null;
    }
  };

  const getDailyHabit = () => {
    const habit = DAILY_HABITS.find((h) => h.area === area);
    return habit;
  };

  const milestone = getMilestoneData();
  const habit = getDailyHabit();

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-gray-900/90 border-2 border-green-600 rounded p-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-fallout text-green-400">{getAreaTitle()}</h2>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-300 font-bold text-2xl w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Current Month Info */}
        <div className="mb-6 p-3 bg-gray-900/50 border border-green-700/50 rounded">
          <p className="text-xs text-green-700 font-fallout tracking-wider">MES ACTUAL</p>
          <p className="text-lg font-bold text-green-400 mt-1">Mes {currentMonth}</p>
        </div>

        {/* Daily Habit */}
        {habit && (
          <div className="mb-6 p-4 bg-gray-900/30 border-l-4 border-green-600 rounded">
            <p className="text-xs text-green-700 font-fallout tracking-wider mb-2">HÁBITO DIARIO CLAVE</p>
            <p className="text-sm text-green-300 font-fallout mb-2">{habit.habit}</p>
            <p className="text-xs text-green-600 italic">Razón: {habit.importance}</p>
          </div>
        )}

        {/* Milestone Data */}
        {milestone && (
          <div className="space-y-4">
            {/* Theme */}
            <div className="p-3 bg-gray-900/50 rounded">
              <p className="text-xs text-green-700 font-fallout tracking-wider mb-1">TEMA DEL MES</p>
              <p className="text-lg font-bold text-green-400 font-fallout">{milestone.theme}</p>
            </div>

            {/* Key Content */}
            <div className="p-4 bg-gray-900/50 rounded">
              <p className="text-xs text-green-700 font-fallout tracking-wider mb-3">CONTENIDO CLAVE</p>
              <ul className="space-y-2">
                {milestone.keyContent.map((content, idx) => (
                  <li key={idx} className="text-sm text-green-300 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{content}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources (if exists) */}
            {"resources" in milestone && (
              <div className="p-4 bg-gray-900/50 rounded">
                <p className="text-xs text-green-700 font-fallout tracking-wider mb-3">RECURSOS</p>
                <ul className="space-y-2">
                  {milestone.resources.map((resource: string, idx: number) => (
                    <li key={idx} className="text-sm text-green-300 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Daily Time (Japonés) */}
            {"dailyTime" in milestone && (
              <div className="p-4 bg-gray-900/50 rounded">
                <p className="text-xs text-green-700 font-fallout tracking-wider mb-2">TIEMPO DIARIO</p>
                <p className="text-sm text-green-300">{milestone.dailyTime}</p>
              </div>
            )}

            {/* Verifiable Achievement */}
            <div className="p-4 bg-green-900/20 border border-green-600/50 rounded">
              <p className="text-xs text-green-700 font-fallout tracking-wider mb-2">LOGRO VERIFICABLE</p>
              <p className="text-sm text-green-200 font-fallout">
                {"verifiableAchievement" in milestone
                  ? milestone.verifiableAchievement
                  : "achievement" in milestone
                  ? milestone.achievement
                  : ""}
              </p>
            </div>

            {/* Why it Matters */}
            <div className="p-3 bg-gray-900/50 border-l-2 border-green-600 rounded">
              <p className="text-xs text-green-700 font-fallout tracking-wider mb-1">IMPORTANCIA</p>
              <p className="text-sm text-green-300">{milestone.importance}</p>
            </div>
          </div>
        )}

        {/* Physical Training Special Section */}
        {area === "fisico" && (
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-gray-900/50 rounded">
              <p className="text-xs text-green-700 font-fallout tracking-wider mb-2">HORARIO</p>
              <p className="text-sm text-green-300">{PHYSICAL_TRAINING.schedule}</p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded">
              <p className="text-xs text-green-700 font-fallout tracking-wider mb-3">PUNTOS CLAVE</p>
              <ul className="space-y-2">
                {PHYSICAL_TRAINING.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-xs text-green-300 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full p-3 bg-green-700 hover:bg-green-600 text-black rounded font-bold font-fallout tracking-wider transition-all duration-200 shadow-lg"
        >
          CERRAR
        </button>
      </div>
    </div>
  );
}
