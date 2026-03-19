export interface TimeBlock {
  start: number;
  end: number;
  label: string;
  area: string;
  color: string;
}

export const SCHEDULE_VERSION_A: TimeBlock[] = [
  {
    start: 7,
    end: 11,
    label: "Estudio mañana",
    area: "study",
    color: "from-blue-600 to-blue-500",
  },
  {
    start: 11,
    end: 13,
    label: "Comida / descanso",
    area: "rest",
    color: "from-gray-600 to-gray-500",
  },
  {
    start: 13,
    end: 15,
    label: "Gym",
    area: "fisico",
    color: "from-green-600 to-green-500",
  },
  {
    start: 15,
    end: 19,
    label: "Clases ITC",
    area: "itc",
    color: "from-purple-600 to-purple-500",
  },
  {
    start: 19,
    end: 21,
    label: "Tareas noche",
    area: "study",
    color: "from-orange-600 to-orange-500",
  },
];

export const SCHEDULE_VERSION_B: TimeBlock[] = [
  {
    start: 7,
    end: 9,
    label: "ITC intensivo",
    area: "itc",
    color: "from-purple-600 to-purple-500",
  },
  {
    start: 9,
    end: 11,
    label: "Astrofísica",
    area: "astrofisica",
    color: "from-blue-600 to-blue-500",
  },
  {
    start: 11,
    end: 13,
    label: "Comida / Repasar ITC",
    area: "rest",
    color: "from-gray-600 to-gray-500",
  },
  {
    start: 13,
    end: 15,
    label: "Gym (si es posible)",
    area: "fisico",
    color: "from-green-600 to-green-500",
  },
  {
    start: 15,
    end: 21,
    label: "ITC bloq. tarde/noche",
    area: "itc",
    color: "from-purple-600 to-purple-500",
  },
];

export function getScheduleForVersion(version: "A" | "B"): TimeBlock[] {
  return version === "A" ? SCHEDULE_VERSION_A : SCHEDULE_VERSION_B;
}

export function getCurrentHour(): number {
  return new Date().getHours();
}

export function getActiveBlock(
  blocks: TimeBlock[],
  currentHour: number
): TimeBlock | null {
  return blocks.find((block) => currentHour >= block.start && currentHour < block.end) || null;
}
