"use client";

import { useEffect, useState } from "react";
import { HABITS } from "@/lib/constants/habits";
import { toggleHabit, getHabitsForDate } from "@/lib/actions/habits";

interface HabitStatus {
  id: string;
  name: string;
  completed: boolean;
}

const habitColors: { [key: string]: { bg: string; border: string; dot: string; checkColor: string } } = {
  astrofisica: { bg: "from-green-900/30 to-green-800/20", border: "border-green-600/50", dot: "bg-green-500", checkColor: "text-green-400" },
  itc: { bg: "from-green-900/30 to-green-800/20", border: "border-green-600/50", dot: "bg-green-500", checkColor: "text-green-400" },
  fisico: { bg: "from-green-900/30 to-green-800/20", border: "border-green-600/50", dot: "bg-green-500", checkColor: "text-green-400" },
  mental: { bg: "from-green-900/40 to-green-800/30", border: "border-green-600/50", dot: "bg-green-600", checkColor: "text-green-500" },
  japones: { bg: "from-green-900/40 to-green-800/30", border: "border-green-600/50", dot: "bg-green-600", checkColor: "text-green-500" },
  enfoque: { bg: "from-green-900/40 to-green-800/30", border: "border-green-600/50", dot: "bg-green-600", checkColor: "text-green-500" },
};

export function HabitChecklist() {
  const [habits, setHabits] = useState<HabitStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const loadHabits = async () => {
      try {
        const { data, error } = await getHabitsForDate(today);

        if (error) {
          console.error('Error loading habits from Supabase:', error);
          // Fallback to localStorage if Supabase fails
          const saved = localStorage.getItem(`habits-${today}`);
          if (saved) {
            setHabits(JSON.parse(saved));
          } else {
            setHabits(HABITS.map((h) => ({ id: h.name, name: h.name, completed: false })));
          }
        } else if (data && data.length > 0) {
          // Map Supabase data to local state
          const completedHabits = new Set(data.map((log: any) => log.habits?.name).filter(Boolean));
          const habitsWithStatus = HABITS.map((h) => ({
            id: h.name,
            name: h.name,
            completed: completedHabits.has(h.name),
          }));
          setHabits(habitsWithStatus);
        } else {
          // No data yet, initialize with empty habits
          setHabits(HABITS.map((h) => ({ id: h.name, name: h.name, completed: false })));
        }
      } catch (error) {
        console.error('Error loading habits:', error);
        setHabits(HABITS.map((h) => ({ id: h.name, name: h.name, completed: false })));
      } finally {
        setIsLoading(false);
      }
    };

    loadHabits();
  }, []);

  const handleToggle = async (habitName: string) => {
    setIsUpdating(true);
    const today = new Date().toISOString().split("T")[0];

    try {
      // Optimistic update UI
      const updated = habits.map((h) =>
        h.name === habitName ? { ...h, completed: !h.completed } : h
      );
      setHabits(updated);

      // Call server action
      await toggleHabit(habitName, today);

      // Also save to localStorage as backup
      localStorage.setItem(`habits-${today}`, JSON.stringify(updated));
    } catch (error) {
      console.error('Error toggling habit:', error);
      // Revert on error
      setHabits(habits);
    } finally {
      setIsUpdating(false);
    }
  };


  if (isLoading) return <div className="text-green-700 font-fallout">INICIALIZANDO...</div>;

  const completedCount = habits.filter((h) => h.completed).length;
  const percentage = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gray-950/80 border-2 border-green-700/50 rounded p-4">
        <div>
          <p className="text-xs text-green-700 font-fallout tracking-widest">PROGRESO DEL DÍA</p>
          <p className="text-3xl font-bold font-fallout text-green-400" style={{ textShadow: "0 0 10px rgba(34, 197, 94, 0.6)" }}>
            {completedCount}/{habits.length}
          </p>
        </div>
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 transform -rotate-90">
            <circle cx="56" cy="56" r="45" fill="none" stroke="#1a3a1a" strokeWidth="4" />
            <circle
              cx="56"
              cy="56"
              r="45"
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeDasharray={`${2.83 * percentage} 283`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold font-fallout text-green-400">{percentage}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {HABITS.map((habit) => {
          const status = habits.find((h) => h.name === habit.name);
          const colors = habitColors[habit.area] || habitColors.mental;

          return (
            <label
              key={habit.name}
              onClick={() => !isUpdating && handleToggle(habit.name)}
              className={`flex items-center gap-4 p-4 rounded border-2 ${colors.border} hover:border-opacity-100 ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} transition-all duration-200 group ${colors.bg}`}
            >
              <div className={`w-6 h-6 rounded border-2 ${colors.border} flex items-center justify-center transition-all flex-shrink-0 ${status?.completed ? colors.dot : ""}`}>
                {status?.completed && <span className={`text-sm font-bold font-fallout ${colors.checkColor}`}>▓</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold font-fallout tracking-wide text-sm ${status?.completed ? "line-through opacity-60" : "text-green-300"}`}>
                  {habit.name}
                </p>
              </div>
              <div className={`w-2 h-2 rounded-full ${colors.dot} transition-all flex-shrink-0`} />
            </label>
          );
        })}
      </div>
    </div>
  );
}
