"use client";

import { useEffect, useState } from "react";

export function QuickLogInput() {
  const [content, setContent] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem(`log-${today}`);
    if (saved) {
      setContent(saved);
    }
  }, []);

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`log-${today}`, content);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="space-y-3">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Escribe tu nota del día..."
        className="w-full h-32 p-4 bg-slate-800 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
      />
      <div className="flex gap-2 justify-end">
        {isSaved && <span className="text-green-400 text-sm">✓ Guardado</span>}
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
