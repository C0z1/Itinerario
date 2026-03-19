"use client";

import { useEffect, useState } from "react";

export function QuickLogInput() {
  const [content, setContent] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem(`log-${today}`);
    if (saved) {
      setContent(saved);
      setCharCount(saved.length);
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
    setCharCount(e.target.value.length);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="¿Cómo fue tu día? Escribe tus reflexiones aquí..."
        className="w-full h-40 p-4 bg-black/80 border-2 border-green-600/50 focus:border-green-400 focus:outline-none resize-none transition-all font-fallout text-green-300 placeholder-green-700"
      />
      <div className="flex items-center justify-between">
        <div className="text-xs text-green-600 font-fallout tracking-widest">
          {charCount} CARACTERES
        </div>
        <div className="flex gap-3">
          {isSaved && (
            <span className="text-sm text-green-500 font-semibold font-fallout flex items-center gap-1 tracking-widest">
              <span className="text-lg">▓</span> GUARDADO
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black rounded font-bold font-fallout tracking-wider transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 text-sm"
          >
            [ GUARDAR ]
          </button>
        </div>
      </div>
    </div>
  );
}
