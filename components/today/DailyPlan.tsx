"use client";

import { useEffect, useState } from "react";
import { SCHEDULES, ASTROPHYSICS_MILESTONES, ITC_MILESTONES, JAPANESE_MILESTONES } from "@/lib/constants/itinerary";

interface DailyPlanProps {
  dayVersion: "A" | "B";
}

export function DailyPlan({ dayVersion }: DailyPlanProps) {
  const [currentTime, setCurrentTime] = useState({ hour: 0, minute: 0 });
  const [currentMonth, setCurrentMonth] = useState(1);

  useEffect(() => {

    const updateTime = () => {
      const now = new Date();
      setCurrentTime({
        hour: now.getHours(),
        minute: now.getMinutes(),
      });
    };

    const now = new Date();
    setCurrentMonth(Math.min(12, now.getMonth() + 1));
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const schedule = SCHEDULES[dayVersion];
  const currentBlockTime = currentTime.hour;
  const currentBlock = schedule.blocks.find(
    (block) => currentBlockTime >= block.startHour && currentBlockTime < block.endHour
  );
  const nextBlock = schedule.blocks.find(
    (block) => block.startHour > currentBlockTime
  );

  const astroMilestone = ASTROPHYSICS_MILESTONES[Math.max(0, currentMonth - 1)];
  const itcMilestone = ITC_MILESTONES[Math.max(0, currentMonth - 1)];
  const japanesMilestone = JAPANESE_MILESTONES[Math.max(0, currentMonth - 1)];

  return (
    <div className="space-y-4">
      {/* Current Block */}
      {currentBlock && (
        <div className="p-4 bg-gray-900/80 border-2 border-green-600 rounded">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-green-700 font-fallout tracking-wider">ACTIVIDAD EN CURSO</p>
              <p className="text-lg font-bold text-green-400 font-fallout mt-2">
                {currentBlock.label}
              </p>
              <p className="text-sm text-green-300 mt-2">{currentBlock.description}</p>
            </div>
            <div className="text-right ml-4">
              <p className="text-2xl font-bold text-green-400 font-fallout">
                {String(currentBlock.startHour).padStart(2, "0")}–{String(currentBlock.endHour).padStart(2, "0")}
              </p>
              <p className="text-xs text-green-700 mt-1">{currentBlock.endHour - currentBlock.startHour} horas</p>
            </div>
          </div>
        </div>
      )}

      {/* Next Block */}
      {nextBlock && (
        <div className="p-4 bg-gray-900/50 border-2 border-green-700/50 rounded">
          <p className="text-xs text-green-700 font-fallout tracking-wider">PRÓXIMA ACTIVIDAD</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex-1">
              <p className="text-base font-bold text-green-400 font-fallout">
                {nextBlock.label}
              </p>
              <p className="text-sm text-green-300 mt-1">{nextBlock.description}</p>
            </div>
            <p className="text-base font-bold text-green-400 ml-4">
              {String(nextBlock.startHour).padStart(2, "0")}:00
            </p>
          </div>
        </div>
      )}

      {/* Monthly Focus by Area */}
      <div className="border-t-2 border-green-800/50 pt-4 mt-6">
        <p className="text-xs text-green-700 font-fallout tracking-wider mb-4">OBJETIVOS MES {currentMonth}</p>

        <div className="space-y-3">
          {/* Astrofísica */}
          <div className="p-3 bg-gray-900/40 border border-green-700/50 rounded">
            <p className="text-sm font-bold text-green-400 mb-1 font-fallout">ASTROFÍSICA</p>
            <p className="text-xs text-green-300">{astroMilestone?.theme}</p>
            <p className="text-xs text-green-600 mt-1 line-clamp-1">{astroMilestone?.keyContent.slice(0, 2).join(" • ")}</p>
          </div>

          {/* ITC */}
          <div className="p-3 bg-gray-900/40 border border-green-700/50 rounded">
            <p className="text-sm font-bold text-green-400 mb-1 font-fallout">TECNOLOGÍA</p>
            <p className="text-xs text-green-300">{itcMilestone?.theme}</p>
            <p className="text-xs text-green-600 mt-1 line-clamp-1">{itcMilestone?.keyContent.slice(0, 2).join(" • ")}</p>
          </div>

          {/* Japonés */}
          <div className="p-3 bg-gray-900/40 border border-green-700/50 rounded">
            <p className="text-sm font-bold text-green-400 mb-1 font-fallout">IDIOMA</p>
            <p className="text-xs text-green-300">{japanesMilestone?.theme}</p>
            <p className="text-xs text-green-600 mt-1 line-clamp-1">{japanesMilestone?.keyContent.slice(0, 2).join(" • ")}</p>
          </div>
        </div>
      </div>

      {/* Daily Schedule Overview */}
      <div className="border-t-2 border-green-800/50 pt-4 mt-4">
        <p className="text-xs text-green-700 font-fallout tracking-wider mb-3">HORARIO COMPLETO VER {dayVersion}</p>
        <div className="space-y-2">
          {schedule.blocks.map((block) => {
            const isActive = currentBlockTime >= block.startHour && currentBlockTime < block.endHour;
            return (
              <div
                key={block.label}
                className={`p-2 rounded border-l-4 text-xs flex items-center justify-between transition-all ${
                  isActive
                    ? `bg-green-900/40 border-green-600 text-green-200`
                    : `bg-gray-900/30 border-gray-600 text-green-300 opacity-60`
                }`}
              >
                <span className="font-fallout">{block.label}</span>
                <span className="text-green-600">
                  {String(block.startHour).padStart(2, "0")}–{String(block.endHour).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
