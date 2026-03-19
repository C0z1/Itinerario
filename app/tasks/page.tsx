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
  const [dayVersion, setDayVersion] = useState<"A" | "B">("A");

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-fallout-dark via-fallout-dark to-fallout-darker text-vault-300 pb-24">
      <Header dayVersion={dayVersion} onVersionChange={setDayVersion} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Section header */}
        <h2 className="text-2xl font-bold mb-6 text-vault-400 font-fallout tracking-wider prompt">
          TAREAS
        </h2>

        {/* Tabs by area */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {AREAS.map((area) => (
            <button
              key={area.value}
              onClick={() => setActiveArea(area.value)}
              className={`px-6 py-2 font-bold font-fallout tracking-widest text-sm transition-all duration-200 transform hover:scale-105 border-2 whitespace-nowrap relative ${
                activeArea === area.value
                  ? "bg-vault-500 text-fallout-dark border-vault-600 shadow-lg shadow-vault-500/50"
                  : "bg-fallout-dark/80 border-vault-600/50 text-vault-500 hover:bg-fallout-dark hover:border-vault-600"
              }`}
            >
              [ {area.label} ]
            </button>
          ))}
        </div>

        {/* Add task input */}
        <div className="bg-fallout-dark/60 rounded p-6 border-2 border-vault-700/50 backdrop-blur-sm shadow-xl mb-6">
          <p className="text-xs text-vault-600 font-fallout tracking-widest mb-4 prompt">NUEVA TAREA</p>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              placeholder="Escribe la tarea y presiona Enter..."
              className="flex-1 px-4 py-3 bg-fallout-dark/80 border-2 border-vault-600/50 focus:border-vault-400 focus:outline-none font-fallout text-vault-300 placeholder-vault-700 rounded transition-all"
            />
            <button
              onClick={handleAddTask}
              className="px-6 py-3 bg-vault-500 hover:bg-vault-400 text-fallout-dark rounded font-bold font-fallout tracking-wider transition-all duration-200 shadow-lg hover:shadow-vault-500/50 transform hover:scale-105 text-sm"
            >
              [ + ]
            </button>
          </div>
        </div>

        {/* Task list */}
        <div className="bg-fallout-dark/60 rounded p-6 border-2 border-vault-700/50 backdrop-blur-sm shadow-xl space-y-3">
          <p className="text-xs text-vault-600 font-fallout tracking-widest mb-4">
            {filteredTasks.length} TAREA{filteredTasks.length !== 1 ? "S" : ""}
          </p>
          {filteredTasks.length === 0 ? (
            <div className="text-vault-600 text-center py-8 font-fallout">
              SIN TAREAS EN ESTA AREA
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-4 bg-fallout-dark/80 border-2 border-vault-600/30 hover:border-vault-600/60 rounded transition-all group"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="w-5 h-5 rounded cursor-pointer accent-vault-500"
                />
                <span
                  className={`flex-1 font-fallout tracking-wide text-sm ${
                    task.completed
                      ? "line-through opacity-50 text-vault-500"
                      : "text-vault-300"
                  }`}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-3 py-1 bg-oxide-600 hover:bg-oxide-500 rounded text-sm font-bold font-fallout text-fallout-dark opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                  title="Eliminar tarea"
                >
                  [ X ]
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
