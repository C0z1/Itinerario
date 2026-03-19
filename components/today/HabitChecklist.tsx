"use client";

import { useEffect, useState } from "react";
import { HABITS } from "@/lib/constants/habits";

interface HabitStatus {
  id: string;
  completed: boolean;
}

export function HabitChecklist() {
  const [habits, setHabits] = useState<HabitStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage for now (will be Supabase later)
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem(`habits-${today}`);

    if (saved) {
      setHabits(JSON.parse(saved));
    } else {
      setHabits(HABITS.map((h) => ({ id: h.name, completed: false })));
    }
    setIsLoading(false);
  }, []);

  const handleToggle = (habitName: string) => {
    const updated = habits.map((h) =>
      h.id === habitName ? { ...h, completed: !h.completed } : h
    );
    setHabits(updated);

    // Save to localStorage
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`habits-${today}`, JSON.stringify(updated));
  };

  if (isLoading) return <div>Cargando...</div>;

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-400 mb-4">
        {completedCount} de {habits.length} completados
      </div>
      <div className="space-y-3">
        {HABITS.map((habit) => {
          const status = habits.find((h) => h.id === habit.name);
          return (
            <label
              key={habit.name}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={status?.completed || false}
                onChange={() => handleToggle(habit.name)}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <span className="text-lg">{habit.icon}</span>
              <span className="text-base font-medium">{habit.name}</span>
              {status?.completed && (
                <span className="ml-auto text-green-400">✓</span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
