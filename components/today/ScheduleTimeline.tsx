"use client";

import { useEffect, useState } from "react";
import {
  getScheduleForVersion,
  getCurrentHour,
  getActiveBlock,
} from "@/lib/constants/schedule";

interface ScheduleTimelineProps {
  dayVersion: "A" | "B";
}

export function ScheduleTimeline({ dayVersion }: ScheduleTimelineProps) {
  const [currentHour, setCurrentHour] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentHour(getCurrentHour());

    const timer = setInterval(() => {
      setCurrentHour(getCurrentHour());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const schedule = getScheduleForVersion(dayVersion);
  const activeBlock = getActiveBlock(schedule, currentHour);

  const isOutOfSchedule = currentHour < 7 || currentHour >= 21;

  return (
    <div className="space-y-3">
      {isOutOfSchedule && (
        <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg text-sm text-slate-300">
          🌙 Fuera de horario - Descansa y recupérate
        </div>
      )}

      {schedule.map((block) => {
        const isActive = activeBlock?.label === block.label;

        return (
          <div
            key={block.label}
            className={`p-4 rounded-lg border transition-all ${
              isActive
                ? `bg-gradient-to-r ${block.color} border-transparent shadow-lg scale-105`
                : "bg-slate-800 border-slate-600 hover:border-slate-500"
            }`}
          >
            <div className="flex items-center gap-3">
              {isActive ? <span className="text-lg animate-pulse">▶</span> : <span className="text-lg">○</span>}
              <div className="flex-1">
                <div className="font-semibold">{block.label}</div>
                <div className={`text-sm ${isActive ? "text-white" : "text-slate-400"}`}>
                  {String(block.start).padStart(2, "0")}:00 –{" "}
                  {String(block.end).padStart(2, "0")}:00
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-600 text-sm text-slate-400">
        <strong>Hora actual:</strong> {String(currentHour).padStart(2, "0")}:00
      </div>
    </div>
  );
}
