"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { AREAS } from "@/lib/constants/habits";

interface Task {
  id: string;
  title: string;
  area: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeArea, setActiveArea] = useState("itc");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [mounted, setMounted] = useState(false);
  const [dayVersion, setDayVersion] = useState<"A" | "B">("A");

  useEffect(() => {
    setMounted(true);
    // Load tasks from localStorage
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }

    // Load day version
    const savedVersion = localStorage.getItem("dayVersion");
    if (savedVersion) {
      setDayVersion(savedVersion as "A" | "B");
    }
  }, []);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      area: activeArea,
      completed: false,
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setNewTaskTitle("");
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const filteredTasks = tasks.filter((t) => t.area === activeArea);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <Header dayVersion={dayVersion} onVersionChange={setDayVersion} />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Tabs by area */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {AREAS.map((area) => (
            <button
              key={area.value}
              onClick={() => setActiveArea(area.value)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                activeArea === area.value
                  ? `bg-gradient-to-r ${area.color} text-white`
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {area.label}
            </button>
          ))}
        </div>

        {/* Add task input */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              placeholder="Agregar nueva tarea..."
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Task list */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-slate-400 text-center py-8">
              Sin tareas para esta área
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="w-5 h-5 rounded cursor-pointer"
                />
                <span
                  className={`flex-1 ${
                    task.completed
                      ? "line-through text-slate-500"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition-all"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <BottomNav currentPage="tasks" />
    </div>
  );
}
