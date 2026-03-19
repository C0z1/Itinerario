"use client";

import { ReactNode, useEffect, useState } from "react";

interface PipboyFrameProps {
  children: ReactNode;
  showGauges?: boolean;
  habitCompletion?: number;
  tasksPending?: number;
}

export function PipboyFrame({ children, showGauges = true, habitCompletion = 50, tasksPending = 5 }: PipboyFrameProps) {
  const [mounted, setMounted] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    const updateTimeProgress = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const totalMinutes = hour * 60 + minute;
      const startHour = 7;
      const endHour = 21;
      const totalMinutesInDay = (endHour - startHour) * 60;
      const minutesIntoDay = Math.max(0, totalMinutes - startHour * 60);
      setTimeProgress(Math.min(100, (minutesIntoDay / totalMinutesInDay) * 100));
    };
    updateTimeProgress();
    const timer = setInterval(updateTimeProgress, 60000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl relative">
        {/* Main content area with enhanced CRT effect */}
        <div className="relative z-10 bg-gradient-to-b from-green-950 via-gray-950 to-gray-900 rounded-xl p-6 border-4 border-green-800 shadow-2xl overflow-hidden"
          style={{
            boxShadow: "0 0 40px rgba(34, 197, 94, 0.15), inset 0 0 60px rgba(34, 197, 94, 0.1), inset 0 0 120px rgba(0, 0, 0, 0.8)"
          }}>

          {/* Scanlines overlay - enhanced */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.2] rounded-xl"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(34, 197, 94, 0.15) 1px, rgba(34, 197, 94, 0.15) 2px, transparent 2px, transparent 4px)"
            }}
          />

          {/* Green CRT glow vignette effect */}
          <div className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
              boxShadow: "inset 0 0 80px rgba(0, 255, 0, 0.1), inset 0 0 150px rgba(0, 0, 0, 0.2)"
            }}
          />

          {/* Main content */}
          <div className="relative z-20 text-green-400 font-fallout">
            {children}
          </div>
        </div>

        {/* Side gauges (Pipboy aesthetic) - Hidden by default */}
        {showGauges && mounted && false && (
          <div className="absolute top-8 right-8 hidden lg:flex flex-col gap-6">
            <PipboyGauge label="HP" value={habitCompletion} />
            <PipboyGauge label="RAD" value={Math.min(100, tasksPending * 15)} />
            <PipboyGauge label="AP" value={timeProgress} />
          </div>
        )}
      </div>
    </div>
  );
}

interface PipboyGaugeProps {
  label: string;
  value: number;
}

function PipboyGauge({ label, value }: PipboyGaugeProps) {
  const gaugeColor = label === "HP" ? "#22c55e" : label === "RAD" ? "#ef4444" : "#3b82f6";

  return (
    <div className="relative">
      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-gray-800 shadow-lg flex items-center justify-center relative"
        style={{
          boxShadow: `0 0 20px ${gaugeColor}40, inset 0 2px 5px rgba(0,0,0,0.3)`
        }}>
        {/* Gauge backing circle */}
        <div className="absolute inset-4 rounded-full border-2 border-gray-700 opacity-50" />

        {/* Gauge pointer */}
        <div className="absolute w-1.5 h-10 rounded-full"
          style={{
            bottom: "50%",
            left: "50%",
            transform: `translateX(-50%) rotate(${(value / 100) * 180 - 90}deg)`,
            background: `linear-gradient(to top, ${gaugeColor}, ${gaugeColor}80)`,
            transition: "transform 0.3s ease-out",
            transformOrigin: "center bottom"
          }}
        />

        {/* Center knob */}
        <div className="w-3 h-3 bg-gray-900 rounded-full relative z-10 border border-gray-700" />

        {/* Value display */}
        <div className="absolute top-6 text-xs font-bold text-gray-800 text-center">{Math.round(value)}%</div>

        {/* Label */}
        <div className="absolute bottom-3 text-xs font-bold text-gray-800 text-center font-fallout">{label}</div>
      </div>
    </div>
  );
}
