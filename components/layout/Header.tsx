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
    <header className="bg-slate-950 border-b-4 border-vault-500 sticky top-0 z-10 shadow-2xl relative overflow-hidden">
      {/* Vault-Tec border effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vault-600 via-vault-400 to-vault-600" />

      {/* ROBCO boot text */}
      <div className="bg-fallout-dark/40 border-b border-vault-600/30 px-4 py-2 text-xs text-vault-600 font-fallout tracking-widest overflow-x-auto whitespace-nowrap">
        <div className="typing-text" style={{ maxWidth: "100%" }}>
          ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-4xl font-bold text-vault-400 tracking-widest" style={{ textShadow: "0 0 10px rgba(212, 163, 2, 0.6)" }}>
            {dayName.toUpperCase()} {date} {monthName.toUpperCase()}
          </h1>
          <p className="text-xs text-vault-600 mt-2 tracking-widest" style={{ letterSpacing: "0.2em" }}>
            ▌ VAULT-TEC BITÁCORA ▌
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleVersionChange("A")}
            className={`px-5 py-3 font-bold tracking-widest text-sm transition-all duration-200 transform hover:scale-105 relative border-2 ${
              dayVersion === "A"
                ? "bg-vault-500 text-slate-950 border-vault-600 shadow-lg shadow-vault-500/50"
                : "bg-slate-900 text-vault-500 border-vault-600/50 hover:bg-slate-800 hover:border-vault-600"
            }`}
            style={{
              textShadow: dayVersion === "A" ? "0 0 5px rgba(212, 163, 2, 0.4)" : "none"
            }}
            title="Schedule Version A - Normal"
          >
            [ A ]
          </button>
          <button
            onClick={() => handleVersionChange("B")}
            className={`px-5 py-3 font-bold tracking-widest text-sm transition-all duration-200 transform hover:scale-105 relative border-2 ${
              dayVersion === "B"
                ? "bg-radiation-600 text-slate-950 border-radiation-500 shadow-lg shadow-radiation-600/50"
                : "bg-slate-900 text-vault-500 border-vault-600/50 hover:bg-slate-800 hover:border-vault-600"
            }`}
            style={{
              textShadow: dayVersion === "B" ? "0 0 5px rgba(34, 197, 94, 0.4)" : "none"
            }}
            title="Schedule Version B - High ITC Load"
          >
            [ B ]
          </button>
        </div>
      </div>
    </header>
  );
}
