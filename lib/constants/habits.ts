export interface Habit {
  id?: string;
  name: string;
  area: string;
  icon: string;
  sort_order: number;
}

export const HABITS: Habit[] = [
  {
    name: "Astrofísica",
    area: "astrofisica",
    icon: "A",
    sort_order: 1,
  },
  {
    name: "Programación",
    area: "itc",
    icon: "P",
    sort_order: 2,
  },
  {
    name: "Físico",
    area: "fisico",
    icon: "F",
    sort_order: 3,
  },
  {
    name: "Mental",
    area: "mental",
    icon: "M",
    sort_order: 4,
  },
  {
    name: "Japonés",
    area: "japones",
    icon: "J",
    sort_order: 5,
  },
  {
    name: "Enfoque",
    area: "enfoque",
    icon: "E",
    sort_order: 6,
  },
];

export const AREAS = [
  { value: "astrofisica", label: "Astrofísica", color: "from-blue-600 to-blue-500" },
  { value: "itc", label: "ITC / Programación", color: "from-purple-600 to-purple-500" },
  { value: "fisico", label: "Físico", color: "from-green-600 to-green-500" },
  { value: "japones", label: "Japonés", color: "from-pink-600 to-pink-500" },
];
