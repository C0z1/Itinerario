export interface Milestone {
  month: number;
  year: number;
  area: "astrofisica" | "itc" | "fisico" | "japones";
  title: string;
  description?: string;
}

export const MILESTONES_SEED: Milestone[] = [
  // ===== MES 1 (Marzo 2026) =====
  {
    month: 1,
    year: 2026,
    area: "astrofisica",
    title: "Resolver 20 problemas de física con notación científica correcta",
    description: "Matemáticas base I - Álgebra lineal, funciones",
  },
  {
    month: 1,
    year: 2026,
    area: "itc",
    title: "Implementar Dijkstra y árbol AVL en Python desde cero",
    description: "Estructuras de datos avanzadas",
  },
  {
    month: 1,
    year: 2026,
    area: "fisico",
    title: "Ejecutar el plan de entrenamiento con consistencia",
    description: "Evaluación de progreso al mes 1",
  },
  {
    month: 1,
    year: 2026,
    area: "japones",
    title: "Leer hiragana y katakana fluidamente (< 5 seg por carácter)",
    description: "Hiragana completo + Katakana + Vocabulario base",
  },

  // ===== MES 2 =====
  {
    month: 2,
    year: 2026,
    area: "astrofisica",
    title: "Derivar ecuaciones de movimiento planetario simples",
    description: "Matemáticas base II + Intro física - Cálculo diferencial",
  },
  {
    month: 2,
    year: 2026,
    area: "itc",
    title: "Resolver 15 problemas de LeetCode nivel medium sin ayuda",
    description: "Algoritmos y Diseño",
  },
  {
    month: 2,
    year: 2026,
    area: "fisico",
    title: "Documentar progreso con métricas objetivas",
    description: "Registro de peso, rendimiento, fotos",
  },
  {
    month: 2,
    year: 2026,
    area: "japones",
    title: "Construir 10 oraciones en japonés con partículas correctas",
    description: "Gramática básica I + 80 kanji N5",
  },

  // ===== MES 3 =====
  {
    month: 3,
    year: 2026,
    area: "astrofisica",
    title: "Simular una órbita elíptica en Python",
    description: "Mecánica clásica - Gravedad newtoniana",
  },
  {
    month: 3,
    year: 2026,
    area: "itc",
    title: "Steam Sense tiene tests, CI/CD y arquitectura limpia documentada",
    description: "Arquitectura de Computadoras + SO",
  },
  {
    month: 3,
    year: 2026,
    area: "fisico",
    title: "Evaluar progreso al mes 3 y ajustar fase si es necesario",
    description: "Revisión trimestral Q1",
  },
  {
    month: 3,
    year: 2026,
    area: "japones",
    title: "Entender un diálogo simple de anime sin subtítulos",
    description: "Gramática básica II + Kanji N5",
  },

  // ===== MES 4 =====
  {
    month: 4,
    year: 2026,
    area: "astrofisica",
    title: "Calcular la temperatura de una estrella desde su color",
    description: "Física ondulatoria y termodinámica",
  },
  {
    month: 4,
    year: 2026,
    area: "itc",
    title: "Primer PR aceptado en repositorio open source relevante",
    description: "Contribuciones a proyectos reales",
  },
  {
    month: 4,
    year: 2026,
    area: "fisico",
    title: "Continuar mejora sostenida - documentar progreso",
    description: "Avance mensual consistente",
  },
  {
    month: 4,
    year: 2026,
    area: "japones",
    title: "Pasar examen de práctica JLPT N5 con 80%+",
    description: "Comprensión auditiva inicial - Shadowing",
  },

  // ===== MES 5 =====
  {
    month: 5,
    year: 2026,
    area: "astrofisica",
    title: "Ubicar 15 estrellas en el diagrama HR y predicen su evolución",
    description: "Astronomía general I - Sistema Solar",
  },
  {
    month: 5,
    year: 2026,
    area: "itc",
    title: "Capturar y analizar tráfico real de SteamSense con Wireshark",
    description: "Redes a fondo + Seguridad básica",
  },
  {
    month: 5,
    year: 2026,
    area: "fisico",
    title: "Documentar progreso con fotos o métricas cada mes",
    description: "Referencia objetiva de avance",
  },
  {
    month: 5,
    year: 2026,
    area: "japones",
    title: "Leer un manga shounen simple con diccionario",
    description: "Gramática N4 + Kanji",
  },

  // ===== MES 6 =====
  {
    month: 6,
    year: 2026,
    area: "astrofisica",
    title: "Ubicar 10 estrellas en el diagrama HR y predecir su evolución",
    description: "Astronomía general II + Estrellas",
  },
  {
    month: 6,
    year: 2026,
    area: "itc",
    title: "Optimizar las queries de SteamSense y documentar mejora",
    description: "Base de datos avanzada",
  },
  {
    month: 6,
    year: 2026,
    area: "fisico",
    title: "Evaluar nivel actual - competencia o seguir construyendo",
    description: "Decisión de dirección para siguiente trimestre",
  },
  {
    month: 6,
    year: 2026,
    area: "japones",
    title: "Entender una conversación de anime slice-of-life sin subtítulos",
    description: "Vocabulario N4 + Inmersión",
  },

  // ===== MES 7 =====
  {
    month: 7,
    year: 2026,
    area: "astrofisica",
    title: "Analizar el espectro del Sol e identificar 5 elementos químicos",
    description: "Astrofísica estelar avanzada",
  },
  {
    month: 7,
    year: 2026,
    area: "itc",
    title: "Entrenar una red neuronal desde cero en numpy para datos astronómicos",
    description: "Machine Learning Avanzado",
  },
  {
    month: 7,
    year: 2026,
    area: "fisico",
    title: "Evaluar si es competencia o seguir construyendo",
    description: "Decisión de meta competencia vs construcción",
  },
  {
    month: 7,
    year: 2026,
    area: "japones",
    title: "Leer manga shounen con diccionario - Entender anime slice-of-life",
    description: "Lectura + Kanji N4 completo",
  },

  // ===== MES 8 =====
  {
    month: 8,
    year: 2026,
    area: "astrofisica",
    title: "Resolver 10 problemas de relatividad con paradoja del gemelo",
    description: "Relatividad especial",
  },
  {
    month: 8,
    year: 2026,
    area: "itc",
    title: "Tener un sistema en producción con pipeline CI/CD profesional",
    description: "DevOps + Cloud Engineering",
  },
  {
    month: 8,
    year: 2026,
    area: "fisico",
    title: "Mantener consistencia - siguiente nivel de mejora",
    description: "Seguir construyendo",
  },
  {
    month: 8,
    year: 2026,
    area: "japones",
    title: "Escribir 5 párrafos sobre tus metas que un nativo entienda",
    description: "JLPT N4 - Consolidación + Escritura",
  },

  // ===== MES 9 =====
  {
    month: 9,
    year: 2026,
    area: "astrofisica",
    title: "Escribir ensayo técnico sobre la expansión acelerada del universo",
    description: "Cosmología y relatividad general (intro)",
  },
  {
    month: 9,
    year: 2026,
    area: "itc",
    title: "Configurar pipeline CI/CD completo con tests automáticos",
    description: "DevOps + CI/CD pipelines profesionales",
  },
  {
    month: 9,
    year: 2026,
    area: "fisico",
    title: "Mantener mejora consistentemente - siguiente nivel",
    description: "Q3 checkpoint",
  },
  {
    month: 9,
    year: 2026,
    area: "japones",
    title: "Ver un episodio completo de anime nivel medio entendiendo 70%+",
    description: "Anime / Manga sin subtítulos",
  },

  // ===== MES 10 =====
  {
    month: 10,
    year: 2026,
    area: "astrofisica",
    title: "Descargar y graficar datos reales del catálogo Gaia con Python",
    description: "Python para astrofísica - AstroPy",
  },
  {
    month: 10,
    year: 2026,
    area: "itc",
    title: "Diseñar la arquitectura de SteamSense 3.0 con microservicios documentada",
    description: "Desarrollo Web Avanzado + Arquitectura System Design",
  },
  {
    month: 10,
    year: 2026,
    area: "fisico",
    title: "Seguir mejorando consistentemente - sin línea de llegada",
    description: "Filosofía: siguiente nivel siempre",
  },
  {
    month: 10,
    year: 2026,
    area: "japones",
    title: "Leer un artículo de NHK Web Easy de principio a fin",
    description: "Lectura + Kanji N4 completo",
  },

  // ===== MES 11 =====
  {
    month: 11,
    year: 2026,
    area: "astrofisica",
    title: "Detectar un exoplaneta real en datos del telescopio Kepler",
    description: "Análisis de datos astronómicos",
  },
  {
    month: 11,
    year: 2026,
    area: "itc",
    title: "Construir un mini-intérprete de un lenguaje simple propio",
    description: "Compiladores e Ingeniería de Lenguajes",
  },
  {
    month: 11,
    year: 2026,
    area: "fisico",
    title: "Mantener consistencia - siguiente nivel de mejora",
    description: "Disciplina sostenida",
  },
  {
    month: 11,
    year: 2026,
    area: "japones",
    title: "Ver un episodio completo entendiendo 70%+ sin subtítulos",
    description: "Anime / Manga sin subtítulos consolidado",
  },

  // ===== MES 12 =====
  {
    month: 12,
    year: 2026,
    area: "astrofisica",
    title: "Publicar análisis en GitHub + contribuir en Zooniverse",
    description: "Contribución real - Zooniverse o arXiv",
  },
  {
    month: 12,
    year: 2026,
    area: "itc",
    title: "Publicar SteamSense 3.0 con arquitectura mejorada + 3 artículos técnicos",
    description: "Proyecto Integrador + Portafolio",
  },
  {
    month: 12,
    year: 2026,
    area: "fisico",
    title: "Mantener mejora consistentemente - no hay línea de llegada",
    description: "Identidad permanente: disciplina física",
  },
  {
    month: 12,
    year: 2026,
    area: "japones",
    title: "Entender sin subtítulos un anime que ya viste con subtítulos en español",
    description: "Comparación mes 1 vs mes 12 - recompensa final",
  },
];

export function getMilestonesForMonth(
  month: number,
  year: number
): Milestone[] {
  return MILESTONES_SEED.filter((m) => m.month === month && m.year === year);
}

export function getCurrentMonthMilestones(): Milestone[] {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return getMilestonesForMonth(month, year);
}
