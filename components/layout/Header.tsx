"use client";

interface HeaderProps {
  dayVersion: "A" | "B";
  onVersionChange: (version: "A" | "B") => void;
}

export function Header({ dayVersion, onVersionChange }: HeaderProps) {
  const today = new Date();
  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"];
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const dayName = days[today.getDay()];
  const date = today.getDate();
  const monthName = months[today.getMonth()];

  const handleVersionChange = (version: "A" | "B") => {
    onVersionChange(version);
    localStorage.setItem("dayVersion", version);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {dayName} {date} {monthName}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleVersionChange("A")}
            className={`px-3 py-1 rounded font-semibold transition-colors ${
              dayVersion === "A"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Ver. A
          </button>
          <button
            onClick={() => handleVersionChange("B")}
            className={`px-3 py-1 rounded font-semibold transition-colors ${
              dayVersion === "B"
                ? "bg-purple-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Ver. B
          </button>
        </div>
      </div>
    </header>
  );
}
