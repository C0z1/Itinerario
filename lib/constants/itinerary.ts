// Complete itinerary extracted from the 12-month plan

export interface DailyBlock {
  startHour: number;
  endHour: number;
  label: string;
  area: string;
  description: string;
}

export interface ScheduleVersion {
  name: 'A' | 'B';
  description: string;
  blocks: DailyBlock[];
}

export const SCHEDULES: Record<string, ScheduleVersion> = {
  A: {
    name: 'A',
    description: 'Día normal',
    blocks: [
      {
        startHour: 7,
        endHour: 11,
        label: 'Mañana',
        area: 'astrofisica',
        description: 'Astrofísica (90 min) → ITC Estudio (60 min) → Japonés Anki (30 min)',
      },
      {
        startHour: 11,
        endHour: 13,
        label: 'Mediodía',
        area: 'rest',
        description: 'Comida · Descanso · Sin pantallas',
      },
      {
        startHour: 13,
        endHour: 15,
        label: 'Pre-clases',
        area: 'fisico',
        description: 'Gym (2 horas)',
      },
      {
        startHour: 15,
        endHour: 19,
        label: 'Clases',
        area: 'itc',
        description: 'ITC — asistir, participar, tomar notas',
      },
      {
        startHour: 19,
        endHour: 21,
        label: 'Noche',
        area: 'itc',
        description: 'Tareas ITC (60 min) → Anime/Manga inmersión (30 min)',
      },
    ],
  },
  B: {
    name: 'B',
    description: 'Día con carga alta en ITC',
    blocks: [
      {
        startHour: 7,
        endHour: 11,
        label: 'Mañana',
        area: 'itc',
        description: 'ITC Estudio profundo (120 min) → Astrofísica (60 min) → Anki (15 min)',
      },
      {
        startHour: 11,
        endHour: 13,
        label: 'Mediodía',
        area: 'rest',
        description: 'Comida · Repasar apuntes del ITC (30 min max)',
      },
      {
        startHour: 13,
        endHour: 15,
        label: 'Pre-clases',
        area: 'fisico',
        description: 'Gym (2 horas) — esto no se mueve',
      },
      {
        startHour: 15,
        endHour: 19,
        label: 'Clases',
        area: 'itc',
        description: 'ITC — asistir, participar, tomar notas',
      },
      {
        startHour: 19,
        endHour: 21,
        label: 'Noche',
        area: 'itc',
        description: 'Tareas ITC enfocadas (90 min) → Solo Anki (15 min)',
      },
    ],
  },
};

export interface MonthlyMilestone {
  month: number;
  theme: string;
  keyContent: string[];
  resources: string[];
  verifiableAchievement: string;
  importance: string;
}

export const ASTROPHYSICS_MILESTONES: MonthlyMilestone[] = [
  {
    month: 1,
    theme: 'Matemáticas base I',
    keyContent: ['Álgebra lineal', 'Funciones', 'Notación científica', 'Trigonometría'],
    resources: ['Khan Academy (gratuito)', '3Blue1Brown YT'],
    verifiableAchievement: 'Resolver 20 problemas de física con notación correcta',
    importance: 'Sin tu base matemática, todo lo demás es memorización vacía.',
  },
  {
    month: 2,
    theme: 'Matemáticas base II + Intro física',
    keyContent: ['Cálculo diferencial básico', 'Derivadas', 'Límites', 'Primera ley de Newton'],
    resources: ['Khan Academy Cálculo', 'MIT OCW 8.01'],
    verifiableAchievement: 'Derivar ecuaciones de movimiento planetario simples',
    importance: 'El cálculo es el idioma en que está escrita la astrofísica.',
  },
  {
    month: 3,
    theme: 'Mecánica clásica',
    keyContent: ['Gravedad newtoniana', 'Órbitas', 'Energía cinética/potencial', 'Momento angular'],
    resources: ['The Feynman Lectures Vol.1 (PDF gratis)'],
    verifiableAchievement: 'Simular una órbita elíptica en Python',
    importance: 'Aquí tu ventaja en Python empieza a activarse.',
  },
  {
    month: 4,
    theme: 'Física ondulatoria y termodinámica',
    keyContent: ['Ondas electromagnéticas', 'Espectro de luz', 'Temperatura estelar', 'Ley de Wien'],
    resources: ['MIT OCW 8.03', 'Crash Course Physics YT'],
    verifiableAchievement: 'Calcular la temperatura de una estrella desde su color',
    importance: 'Este mes conectas física con astronomía real por primera vez.',
  },
  {
    month: 5,
    theme: 'Astronomía general I',
    keyContent: ['Sistema Solar', 'Formación planetaria', 'Escalas del universo', 'Telescopios'],
    resources: ['Crash Course Astronomy (42 ep.)', 'Stellarium'],
    verifiableAchievement: 'Identificar 15 objetos del cielo con Stellarium y explicarlos',
    importance: 'Empieza a ver el universo con ojos de físico, no de turista.',
  },
  {
    month: 6,
    theme: 'Astronomía general II + Estrellas',
    keyContent: ['Ciclo estelar', 'Diagrama HR', 'Gigantes/enanas', 'Supernovas', 'Pulsares'],
    resources: ['An Introduction to Modern Astrophysics — Cap. 1–6'],
    verifiableAchievement: 'Ubicar 10 estrellas en el diagrama HR y predecir su evolución',
    importance: 'Ya puedes hablar de astrofísica estelar con rigor.',
  },
  {
    month: 7,
    theme: 'Astrofísica estelar avanzada',
    keyContent: ['Espectroscopía', 'Líneas de absorción', 'Composición química estelar', 'Magnitudes'],
    resources: ['Libro cap. 7–12', 'SpectroLab simulador online'],
    verifiableAchievement: 'Analizar el espectro del Sol e identificar 5 elementos',
    importance: 'Esto es lo que hacen los astrofísicos profesionales.',
  },
  {
    month: 8,
    theme: 'Relatividad especial',
    keyContent: ['Dilatación del tiempo', 'Contracción espacial', 'E=mc²', 'Marco de referencia'],
    resources: ['Curso Einstein de Stanford (YouTube gratuito)'],
    verifiableAchievement: 'Resolver 10 problemas de relatividad con paradoja del gemelo',
    importance: 'La relatividad es donde la astrofísica se vuelve contraintuitiva.',
  },
  {
    month: 9,
    theme: 'Cosmología y relatividad general (intro)',
    keyContent: ['Big Bang', 'Expansión del universo', 'Materia/energía oscura', 'Agujeros negros'],
    resources: ['Libro cap. 27–30', 'Kurzgesagt YT'],
    verifiableAchievement: 'Escribir un ensayo técnico sobre la expansión acelerada',
    importance: 'Pocos autodidactas llegan aquí con comprensión real.',
  },
  {
    month: 10,
    theme: 'Python para astrofísica — AstroPy',
    keyContent: ['AstroPy', 'Manejo de archivos FITS', 'Catálogos estelares', 'Coordenadas celestes'],
    resources: ['AstroPy docs', 'NASA Exoplanet Archive', 'Tutorial oficial'],
    verifiableAchievement: 'Descargar y graficar datos reales del catálogo Gaia con Python',
    importance: 'Tu diferenciador clave: programas lo que otros solo leen.',
  },
  {
    month: 11,
    theme: 'Análisis de datos astronómicos',
    keyContent: ['Datos de Kepler', 'Curvas de luz', 'Detección de exoplanetas', 'Estadística bayesiana'],
    resources: ['NASA Exoplanet Archive', 'Lightkurve (librería Python)'],
    verifiableAchievement: 'Detectar un exoplaneta real en datos del telescopio Kepler',
    importance: 'Este logro ya es de nivel de paper de investigación.',
  },
  {
    month: 12,
    theme: 'Contribución real',
    keyContent: ['Zooniverse (clasificación de galaxias)', 'GitHub científico', 'Citizen science'],
    resources: ['Zooniverse.org', 'arXiv.org', 'ADS (Astrophysics Data System)'],
    verifiableAchievement: 'Publicar análisis en GitHub + contribuir en Zooniverse',
    importance: 'Si llegas aquí, ya no eres un hobbysta — eres un colaborador.',
  },
];

export const ITC_MILESTONES: MonthlyMilestone[] = [
  {
    month: 1,
    theme: 'Estructuras de Datos Avanzadas',
    keyContent: ['Árboles AVL', 'Grafos', 'Heaps', 'Hash tables', 'Complejidad O(n)'],
    resources: ['Libro: Introduction to Algorithms (CLRS)', 'Visualgo.net'],
    verifiableAchievement: 'Implementar un grafo con Dijkstra en Python desde cero',
    importance: 'Ya usas listas/dicts — esto lleva tu Python al nivel de ingeniero.',
  },
  {
    month: 2,
    theme: 'Algoritmos y Diseño',
    keyContent: ['Divide y vencerás', 'Programación dinámica', 'Backtracking', 'Greedy'],
    resources: ['LeetCode (50 problemas)', 'MIT OCW 6.006'],
    verifiableAchievement: 'Resolver 15 problemas de LeetCode nivel medium sin ayuda',
    importance: 'SteamSense tiene lógica de negocio — esto la hace óptima.',
  },
  {
    month: 3,
    theme: 'Arquitectura de Computadoras',
    keyContent: ['CPU', 'Memoria', 'Caché', 'Pipeline', 'Ensamblador básico', 'Virtualización'],
    resources: ['CS:APP libro (Bryant)', 'Nand2Tetris (proyecto gratis online)'],
    verifiableAchievement: 'Construir una ALU simple en Nand2Tetris y documentarla',
    importance: 'Entender por qué tu código es lento o rápido a nivel de hardware.',
  },
  {
    month: 4,
    theme: 'Sistemas Operativos a fondo',
    keyContent: ['Procesos', 'Threads', 'Scheduling', 'Memory management', 'Syscalls'],
    resources: ['Operating Systems: 3 Easy Pieces (PDF gratis)', 'Linux man pages'],
    verifiableAchievement: 'Escribir un scheduler simple en C o Python con simulación',
    importance: 'Ya cursaste SO — esto es llevarlo de teoría a implementación real.',
  },
  {
    month: 5,
    theme: 'Redes a fondo + Seguridad básica',
    keyContent: ['TCP/IP profundo', 'HTTP/2', 'WebSockets', 'TLS/SSL', 'CORS', 'JWT real'],
    resources: ['Computer Networks (Tanenbaum)', 'Wireshark práctica'],
    verifiableAchievement: 'Capturar y analizar tráfico real de SteamSense con Wireshark',
    importance: 'Directamente aplicable: SteamSense usa JWT y APIs REST.',
  },
  {
    month: 6,
    theme: 'Base de Datos Avanzada',
    keyContent: ['SQL avanzado', 'Índices', 'Query planner', 'Transacciones ACID', 'NoSQL', 'DuckDB internals'],
    resources: ['Use The Index, Luke (gratis)', 'PostgreSQL docs'],
    verifiableAchievement: 'Optimizar las queries de SteamSense y documentar mejora de rendimiento',
    importance: 'Tienes DuckDB en prod — entender sus internals te da ventaja real.',
  },
  {
    month: 7,
    theme: 'Inteligencia Artificial — Fundamentos',
    keyContent: ['Búsqueda heurística', 'Lógica', 'Árboles de decisión', 'Naive Bayes', 'SVM'],
    resources: ['CS50 AI (Harvard, gratis)', 'Libro: AIMA (Russell & Norvig)'],
    verifiableAchievement: 'Implementar un clasificador sin sklearn — solo numpy',
    importance: 'Entender IA sin cajas negras: por qué GradientBoosting funciona en SteamSense.',
  },
  {
    month: 8,
    theme: 'Machine Learning Avanzado',
    keyContent: ['Redes neuronales', 'Backpropagation', 'CNNs', 'Regularización', 'Feature engineering'],
    resources: ['Fast.ai (gratis)', 'Deep Learning de Goodfellow (PDF)'],
    verifiableAchievement: 'Entrenar una red neuronal desde cero en numpy para clasificar datos astronómicos',
    importance: 'Conecta directamente con tu ruta de astrofísica en Mes 10.',
  },
  {
    month: 9,
    theme: 'DevOps + Cloud Engineering',
    keyContent: ['Docker avanzado', 'Kubernetes intro', 'CI/CD pipelines', 'GitHub Actions', 'Render vs AWS'],
    resources: ['The DevOps Handbook', 'Documentación oficial Docker/K8s'],
    verifiableAchievement: 'Configurar pipeline CI/CD completo para SteamSense con tests automáticos',
    importance: 'Pasas de tener un proyecto en prod a tener un proyecto en prod profesional.',
  },
  {
    month: 10,
    theme: 'Desarrollo Web Avanzado + Arquitectura',
    keyContent: ['System design', 'Microservicios', 'Event-driven', 'REST vs GraphQL', 'WebSockets'],
    resources: ['Designing Data-Intensive Applications (Kleppmann)', 'System Design Primer (GitHub)'],
    verifiableAchievement: 'Diseñar la arquitectura de SteamSense 3.0 con microservicios documentada',
    importance: 'Este libro es el más citado en entrevistas de ingeniería de software.',
  },
  {
    month: 11,
    theme: 'Compiladores e Ingeniería de Lenguajes',
    keyContent: ['Gramáticas formales', 'Lexer', 'Parser', 'AST', 'Intérprete básico'],
    resources: ['Crafting Interpreters (gratis online)', 'Dragon Book (referencia)'],
    verifiableAchievement: 'Construir un mini-intérprete de un lenguaje simple propio',
    importance: 'Pocos ingenieros tocan esto — te diferencia enormemente en entrevistas.',
  },
  {
    month: 12,
    theme: 'Proyecto Integrador + Portafolio',
    keyContent: ['Integrar todo en un proyecto real', 'Documentación técnica', 'README profesional', 'Blog técnico'],
    resources: ['GitHub', 'dev.to', 'Hashnode para publicar'],
    verifiableAchievement: 'Publicar SteamSense 3.0 con arquitectura mejorada + escribir 3 artículos técnicos',
    importance: 'Un portafolio con proyectos así supera a la mayoría de egresados del ITC.',
  },
];

export const PHYSICAL_TRAINING = {
  area: 'fisico',
  dailyHabit: 'El gym a la 1 PM es inamovible — si algo falla, ese bloque se protege primero',
  importance: 'El entrenamiento es tu ancla de disciplina que sostiene todo lo demás',
  schedule: 'Lun–Vie: 1–3 PM (2 horas)',
  focus: 'Fase: Definición/Corte',
  keyPoints: [
    'El entrenamiento es tu ancla de disciplina',
    'Si algo debe caer, que no sea el gym',
    'La consistencia importa más que la intensidad',
    'Documenta progreso con fotos o métricas cada mes',
    'Q1: Ejecutar plan con consistencia',
    'Q2: Continuar mejora sostenida',
    'Q3: Evaluar si competencia o seguir construyendo',
    'Q4: Seguir mejorando consistentemente — no hay línea de llegada',
  ],
};

export const JAPANESE_MILESTONES = [
  {
    month: 1,
    theme: 'Hiragana completo',
    dailyTime: '30 min',
    keyContent: ['Los 46 caracteres hiragana + dakuten', 'Pronunciación exacta', 'Primeras 50 palabras'],
    achievement: 'Escribir y leer hiragana sin consultar tabla en menos de 5 segundos por carácter',
    importance: 'Todo el japonés escrito parte de aquí. Sin esto, nada más avanza.',
  },
  {
    month: 2,
    theme: 'Katakana + Vocabulario base',
    dailyTime: '30 min',
    keyContent: ['Los 46 katakana', '200 palabras de uso diario', 'Números, colores, tiempo'],
    achievement: 'Leer un menú o cartel en katakana e hiragana sin ayuda',
    importance: 'Katakana es clave para anime — nombres, efectos, palabras extranjeras.',
  },
  {
    month: 3,
    theme: 'Gramática básica I + Kanji N5',
    dailyTime: '30 min',
    keyContent: ['Estructura SVO→SOV', 'Partículas は、が、を、に、で', 'Primeros 80 kanji N5'],
    achievement: 'Construir 10 oraciones simples sobre ti mismo en japonés escrito',
    importance: 'Los kanji parecen imposibles — no lo son si los aprendes por radicales.',
  },
  {
    month: 4,
    theme: 'Gramática básica II + Kanji N5',
    dailyTime: '30 min',
    keyContent: ['Verbos en presente/pasado', 'Formas て y ない', '80 kanji más'],
    achievement: 'Entender un diálogo simple de anime con subtítulos',
    importance: 'Aquí empieza a verse el progreso real — puedes captar frases.',
  },
  {
    month: 5,
    theme: 'Comprensión auditiva inicial',
    dailyTime: '30 min',
    keyContent: ['Shadowing (imitar hablantes nativos)', 'Anime con subtítulos en japonés', 'Ritmo natural'],
    achievement: 'Ver 3 episodios de anime con subtítulos en japonés y entender 40% sin parar',
    importance: 'El salto de estudiar japonés a escuchar japonés real es enorme. Este mes lo cruzas.',
  },
  {
    month: 6,
    theme: 'JLPT N5 — Consolidación',
    dailyTime: '30 min',
    keyContent: ['Repasar todo N5', 'Gramática, kanji, vocabulario', 'Primer examen de práctica'],
    achievement: 'Pasar un examen de práctica JLPT N5 con 80%+ de aciertos',
    importance: 'N5 es el primer nivel oficial. Pasarlo consolida todo lo aprendido.',
  },
  {
    month: 7,
    theme: 'Gramática N4 + Kanji',
    dailyTime: '30 min',
    keyContent: ['Formas condicionales', 'Verbos potenciales', 'Pasiva/causativa', '170 kanji N4'],
    achievement: 'Leer un manga shounen simple (Doraemon, Yotsubato) con diccionario',
    importance: 'N4 es donde el japonés se pone interesante — puedes leer cosas reales.',
  },
  {
    month: 8,
    theme: 'Vocabulario N4 + Inmersión',
    dailyTime: '30 min',
    keyContent: ['1500 palabras acumuladas', 'Anime sin subtítulos en escenas simples', 'Listening intensivo'],
    achievement: 'Entender una conversación completa de anime slice-of-life sin subtítulos',
    importance: 'Los anime slice-of-life tienen vocabulario cotidiano — perfectos para este nivel.',
  },
  {
    month: 9,
    theme: 'Lectura + Kanji N4 completo',
    dailyTime: '30 min',
    keyContent: ['Todos los 300 kanji N4', 'Leer NHK Web Easy', 'Manga sin furigana'],
    achievement: 'Leer un artículo de NHK Web Easy de principio a fin con diccionario',
    importance: 'NHK Web Easy son noticias reales escritas con japonés simplificado.',
  },
  {
    month: 10,
    theme: 'JLPT N4 — Consolidación + Escritura',
    dailyTime: '30 min',
    keyContent: ['Repasar N4 completo', 'Empezar a escribir párrafos', 'Diario en japonés (3 líneas/día)'],
    achievement: 'Escribir 5 párrafos sobre tus metas en japonés y que un nativo los entienda',
    importance: 'HelloTalk te conecta con japoneses reales — feedback inmediato.',
  },
  {
    month: 11,
    theme: 'Anime / Manga sin subtítulos',
    dailyTime: '30 min',
    keyContent: ['Anime de dificultad media sin subtítulos', 'Vocabulario específico de anime', 'Slang'],
    achievement: 'Ver un episodio completo de anime nivel medio entendiendo 70%+ sin subtítulos',
    importance: '70% de comprensión es el umbral donde el japonés se vuelve disfrutable.',
  },
  {
    month: 12,
    theme: 'Consolidación + Meta real',
    dailyTime: '30 min',
    keyContent: ['Repasar todo N4', 'Definir si continuar a N3', 'Proyecto de inmersión mensual'],
    achievement: 'Entender sin subtítulos un anime que ya viste con subtítulos en español',
    importance: 'Comparar la diferencia entre el Mes 1 y el Mes 12 es la mejor recompensa.',
  },
];

export const DAILY_HABITS = [
  {
    area: 'astrofisica',
    habit: 'Abrir el libro o recurso antes de revisar el celular — aunque sean 10 minutos',
    importance: 'La consistencia diaria supera las sesiones largas esporádicas',
  },
  {
    area: 'itc',
    habit: 'Escribir aunque sea 10 líneas de código al día — un commit diario en GitHub',
    importance: 'Los días "sin tiempo" son los más importantes para mantener el hábito',
  },
  {
    area: 'fisico',
    habit: 'El gym a la 1 PM es inamovible — si algo falla, ese bloque se protege primero',
    importance: 'El entrenamiento es tu ancla de disciplina que sostiene todo lo demás',
  },
  {
    area: 'mental',
    habit: 'Revisar las 3 metas cada domingo por la noche — ¿qué avancé esta semana?',
    importance: 'Sin revisión semanal, el plan se convierte en decoración',
  },
  {
    area: 'japones',
    habit: 'Hacer las tarjetas Anki del día — aunque solo sean 10 min — todos los días sin excepción',
    importance: 'Saltarte Anki 1 día crea deuda. Saltarte 3 días = semana perdida de kanji',
  },
  {
    area: 'enfoque',
    habit: 'Teléfono boca abajo durante los bloques de estudio — sin excepciones',
    importance: 'Una notificación interrumpe 23 minutos de concentración profunda en promedio',
  },
];

export const QUARTERLY_GOALS = {
  Q1: {
    astrofisica: 'Completar matemáticas base + física clásica · Entender qué áreas de investigación están abiertas a contribuciones externas',
    itc: 'Dominar estructuras de datos y algoritmos avanzados · Refactorizar SteamSense con arquitectura limpia y tests · Primer PR a repo open source',
    fisico: 'Ejecutar el plan de entrenamiento con consistencia · Evaluar progreso al mes 3 y ajustar fase si es necesario',
    japones: 'Dominar hiragana + katakana · Primeras 300 palabras · Estructura básica de oraciones · Empezar Genki I',
  },
  Q2: {
    astrofisica: 'Astronomía estelar con rigor técnico · Identificar un problema o dataset abierto donde Python + ML puedan aportar algo nuevo',
    itc: 'Dominar SO, redes y BD a nivel de implementación · Contribuir activamente a un proyecto open source con PRs documentados',
    fisico: 'Continuar mejora sostenida · Documentar progreso con fotos o métricas cada mes para tener referencia objetiva',
    japones: 'Pasas JLPT N5 con 80%+ · Entiendes 40% de anime con subtítulos JP',
  },
  Q3: {
    astrofisica: 'Astrofísica real: espectros, relatividad, cosmología · Primer análisis con datos reales publicado en GitHub · Contactar con comunidad científica',
    itc: 'IA/ML sin cajas negras + DevOps profesional · Tener un sistema en producción con pipeline CI/CD, tests y documentación de nivel empresa',
    fisico: 'Evaluar si el nivel actual es competencia o seguir construyendo · Definir si la próxima meta es escenario o récord personal',
    japones: '300 kanji N4 dominados · Leer manga con diccionario · Entender anime slice-of-life sin subtítulos',
  },
  Q4: {
    astrofisica: 'Análisis real con AstroPy sobre datos del catálogo Gaia o Kepler · Publicar resultado en arXiv o contribuir en Zooniverse con análisis documentado',
    itc: 'System design dominado · Portafolio publicado con 3+ proyectos documentados · Perfil listo para roles senior o research engineer',
    fisico: 'Seguir mejorando consistentemente — no hay línea de llegada, hay siguiente nivel',
    japones: 'Entender anime sin subtítulos al 70%+ · Escribir párrafos que nativos entienden · Base sólida para N3',
  },
};
