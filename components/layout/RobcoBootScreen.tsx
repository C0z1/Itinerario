"use client";

import { useEffect, useState } from "react";

interface RobcoBootScreenProps {
  onComplete: () => void;
}

export function RobcoBootScreen({ onComplete }: RobcoBootScreenProps) {
  const [bootText, setBootText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [githubInfo, setGithubInfo] = useState<{ login: string; public_repos: number; followers: number } | null>(null);

  useEffect(() => {
    // Fetch GitHub profile info (client-side only)
    if (typeof window !== "undefined") {
      const fetchGitHub = async () => {
        try {
          const res = await fetch("https://api.github.com/users/C0z1");
          if (res.ok) {
            const data = await res.json();
            setGithubInfo({
              login: data.login,
              public_repos: data.public_repos,
              followers: data.followers,
            });
          }
        } catch (error) {
          console.error("GitHub fetch error:", error);
          // Fallback si falla
          setGithubInfo({
            login: "C0z1",
            public_repos: 5,
            followers: 10,
          });
        }
      };
      fetchGitHub();
    }

    const bootSequence = [
      "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
      "COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
      "ALL RIGHTS RESERVED",
      "",
      "Memory: 2048K OK",
      "Processor: VAULT-TEC MAINFRAME v2.2",
      "Storage: AVAILABLE",
      "Network: CONNECTED",
      "",
      "INITIATING BITACORA PERSONAL...",
      "LOADING VAULT-TEC PROTOCOLS...",
      "SYNCHRONIZING WITH VAULT NETWORK...",
      "",
      `[USER: ${githubInfo?.login?.toUpperCase() || "FELIX"}]`,
      `[REPOS: ${githubInfo?.public_repos || "?"} | FOLLOWERS: ${githubInfo?.followers || "?"}]`,
      "",
      "WELCOME, VAULT DWELLER",
      "",
      "Press [ENTER] to continue...",
    ];

    let charIndex = 0;
    let lineIndex = 0;
    let currentText = "";

    const typeInterval = setInterval(() => {
      if (lineIndex < bootSequence.length) {
        const currentLine = bootSequence[lineIndex];

        if (charIndex < currentLine.length) {
          currentText += currentLine[charIndex];
          setBootText((prev) => {
            const lines = prev.split("\n");
            lines[lineIndex] = currentText;
            return lines.join("\n");
          });
          charIndex++;
        } else {
          charIndex = 0;
          currentText = "";
          lineIndex++;
          setBootText((prev) => prev + "\n");
        }
      } else {
        clearInterval(typeInterval);
        setIsComplete(true);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-950 z-50 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full p-8 font-fallout text-green-400 text-sm md:text-base flex flex-col justify-center max-w-2xl mx-auto">
        <pre
          className="whitespace-pre-wrap break-words tracking-widest leading-relaxed"
          style={{
            textShadow: "0 0 10px rgba(34, 197, 94, 0.6)",
            fontFamily: "'VT323', monospace",
            color: "#22c55e",
          }}
        >
          {bootText}
        </pre>

        {isComplete && (
          <div className="mt-8 text-center">
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black rounded font-bold font-fallout tracking-wider transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105"
            >
              [ ENTER ]
            </button>
          </div>
        )}
      </div>

      {/* Scanlines effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 1px, #22c55e 1px, #22c55e 2px)",
        }}
      />
    </div>
  );
}
