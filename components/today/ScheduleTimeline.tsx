"use client";

import { useEffect, useState } from "react";
import {
  getScheduleForVersion,
  getActiveBlock,
} from "@/lib/constants/schedule";

interface ScheduleTimelineProps {
  dayVersion: "A" | "B";
}

export function ScheduleTimeline({ dayVersion }: ScheduleTimelineProps) {
  const [currentTime, setCurrentTime] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {

    const updateTime = () => {
      const now = new Date();
      setCurrentTime({
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const schedule = getScheduleForVersion(dayVersion);
  const activeBlock = getActiveBlock(schedule, currentTime.hour);

  const isOutOfSchedule = currentTime.hour < 7 || currentTime.hour >= 21;

  const blockColors: { [key: string]: string } = {
    study: "from-green-800/60 to-green-900/40 border-green-600",
    rest: "from-gray-900/80 to-gray-950 border-green-700",
    fisico: "from-green-900/40 to-green-800/30 border-green-600",
    itc: "from-green-900/40 to-green-800/30 border-green-600",
    astrofisica: "from-green-900/40 to-green-800/30 border-green-600",
  };

  return (
    <div className="space-y-3">
      {isOutOfSchedule && (
        <div className="p-4 bg-green-900/30 border-2 border-green-600/50 rounded text-sm text-green-200 font-fallout">
          <span className="font-bold tracking-widest">FUERA DE HORARIO</span> — Descansa y recuperate
        </div>
      )}

      {schedule.map((block) => {
        const isActive = activeBlock?.label === block.label;
        const blockColor = blockColors[block.area] || blockColors.study;

        return (
          <div
            key={block.label}
            className={`relative p-5 rounded border-2 transition-all duration-300 overflow-hidden group bg-gradient-to-r ${blockColor} ${
              isActive
                ? "shadow-xl shadow-green-600/30 scale-105"
                : ""
            }`}
          >
            <div className="relative z-10 flex items-center gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded flex items-center justify-center font-bold font-fallout text-sm transition-all ${
                isActive
                  ? "bg-green-600 text-gray-900"
                  : "bg-gray-900/80 text-green-600 border border-green-700"
              }`}>
                {String(block.start).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold font-fallout tracking-wide truncate text-sm ${isActive ? "text-green-200" : "text-green-300"}`}>
                  {block.label}
                </div>
                <div className={`text-xs mt-1 font-fallout ${isActive ? "text-green-100" : "text-green-600"}`}>
                  {String(block.start).padStart(2, "0")}:00 – {String(block.end).padStart(2, "0")}:00
                </div>
              </div>
              {isActive && (
                <div className="flex-shrink-0">
                  <div className="relative w-3 h-3">
                    <div className="absolute inset-0 bg-green-300 rounded-full animate-pulse" />
                    <div className="absolute inset-0.5 bg-green-600 rounded-full" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="mt-6 p-4 bg-gray-900 border-2 border-green-600/50 rounded text-center">
        <p className="text-green-600 text-xs font-fallout tracking-widest">HORA ACTUAL</p>
        <p className="text-4xl font-bold font-fallout text-green-400 mt-2 tracking-wider" style={{ textShadow: "0 0 10px rgba(34, 197, 94, 0.6)" }}>
          {String(currentTime.hour).padStart(2, "0")}:{String(currentTime.minute).padStart(2, "0")}:{String(currentTime.second).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
