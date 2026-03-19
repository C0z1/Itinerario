# Bitácora Félix 📋

Una bitácora personal diseñada para rastrear tu itinerario diario con 4 áreas principales: **ITC**, **Astrofísica**, **Físico**, y **Japonés**.

Consulta la app múltiples veces al día desde cualquier dispositivo. Ideal para estudiantes con metas ambiciosas en múltiples dominios.

---

## ✨ Características

- **📅 Vista Diaria**: Horario personalizado con bloque activo resaltado
- **🎯 6 Hábitos Clave**: Marca los hábitos diarios de cada área
- **✓ Gestión de Tareas**: Agrega y elimina tareas por área
- **📊 Rastreador de Progreso**: Milestones mensuales del itinerario (12 meses × 4 áreas)
- **📖 Historial**: Revisa tus días anteriores
- **📱 Mobile First**: Diseño responsive, funciona perfectamente en celular
- **📲 Instalable como PWA**: Agrega a pantalla de inicio en tu celular
- **💾 Sincronización**: Datos guardados en la nube (Supabase)

---

## 🚀 Stack

```
Frontend:  Next.js 14 + Tailwind CSS
Database:  Supabase (PostgreSQL)
Deploy:    Vercel
Mobile:    PWA (instalable como app nativa)
Cost:      $0/mes
```

---

## 📦 Instalación Rápida

### Paso 1: Clonar el repo

```bash
git clone https://github.com/[tu-usuario]/bitacora.git
cd bitacora
npm install
```

### Paso 2: Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com) (free tier)
2. Ejecuta el SQL schema en `supabase/migrations/001_initial_schema.sql`
3. Copia tus credenciales

### Paso 3: Variables de entorno

```bash
cp .env.local.example .env.local
# Edita .env.local con tus credenciales de Supabase
```

### Paso 4: Desarrollar localmente

```bash
npm run dev
# Abre http://localhost:3000
```

### Paso 5: Desplegar

Push a GitHub y conecta en [vercel.com](https://vercel.com). Auto-deploy automático.

**Ver instrucciones detalladas en [DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## 📱 Características Mobile

### Navegación por tabs (mobile)

- **Hoy**: Vista principal con hábitos, horario y log
- **Tareas**: Gestión de tareas por área
- **Progreso**: Milestones del mes actual
- **Log**: Historial de días anteriores

### Usar como app nativa

1. **Chrome**: Menú (⋮) → "Instalar aplicación"
2. **Safari**: Compartir → "Agregar a pantalla de inicio"

---

## 🗂️ Estructura del Proyecto

```
bitacora/
├── app/                          # Next.js App Router
│   ├── today/page.tsx            # Vista principal
│   ├── tasks/page.tsx            # Gestión de tareas
│   ├── progress/page.tsx         # Progreso mensual
│   ├── log/page.tsx              # Historial
│   └── layout.tsx                # Layout principal
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Header + toggle versión A/B
│   │   └── BottomNav.tsx         # Navegación mobile
│   └── today/
│       ├── HabitChecklist.tsx    # 6 hábitos
│       ├── ScheduleTimeline.tsx  # Horario del día
│       └── QuickLogInput.tsx     # Nota del día
├── lib/
│   ├── constants/
│   │   ├── schedule.ts           # Horarios Version A y B
│   │   ├── milestones.ts         # 48 milestones del itinerario
│   │   └── habits.ts             # 6 hábitos fijos
│   └── supabase/
│       └── client.ts             # Cliente Supabase
├── public/
│   └── manifest.json             # PWA manifest
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql # Schema completo
```

---

## 🎯 Funcionalidades Core

### Marcar hábito diario

```
Toca checkbox → Se guarda en localStorage (luego en Supabase)
```

### Agregar tarea

```
Escribe título → Selecciona área → Presiona Enter o toca +
```

### Ver horario actual

- El bloque activo se resalta dinámicamente
- Se actualiza cada minuto
- Muestra hora actual

### Seguir progreso mensual

- Completa los milestones del mes
- Rastrear avance en 4 áreas
- Guardar evidencia de logros

---

## 🔧 Datos: localStorage vs Supabase

**Por ahora**: Todo se guarda en localStorage (memoria del navegador)
- ✓ Funciona sin internet (después de cargar la página)
- ✗ Datos solo en este navegador

**Después**: Conectar a Supabase
- ✓ Sincroniza en múltiples dispositivos
- ✓ Datos persistentes en servidor
- ✓ Autenticación con email

---

## 📊 Datos de Ejemplo

### Hábitos (6 fijos)

- 🔭 Astrofísica
- 💻 Programación
- 🏋️ Físico
- 🧘 Mental
- 🇯🇵 Japonés
- 🎯 Enfoque

### Áreas de tareas

- **ITC**: Ingeniería en Tecnologías Computacionales
- **Astrofísica**: Estudio de astrophysics
- **Físico**: Entrenamientos, fitness
- **Japonés**: Idioma, anime, manga

### Horario Versión A (normal)

| Hora | Actividad |
|---|---|
| 7-11 | Estudio mañana |
| 11-13 | Comida / descanso |
| 13-15 | Gym |
| 15-19 | Clases ITC |
| 19-21 | Tareas noche |

### Horario Versión B (carga alta ITC)

| Hora | Actividad |
|---|---|
| 7-9 | ITC intensivo |
| 9-11 | Astrofísica |
| 11-13 | Comida / Repasar |
| 13-15 | Gym |
| 15-21 | ITC bloq. tarde/noche |

### Milestones (12 meses × 4 áreas = 48 total)

Ejemplos:

- **Mes 1 - ITC**: Implementar Dijkstra y AVL en Python
- **Mes 1 - Astrofísica**: Resolver 20 problemas de física
- **Mes 6 - Progreso**: Publicar análisis con datos reales
- **Mes 12 - Final**: Portafolio completamente documentado

---

## 🛠️ Desarrollo

### Instalar dependencias

```bash
npm install
```

### Ejecutar localmente

```bash
npm run dev
# http://localhost:3000
```

### Build para producción

```bash
npm run build
npm run start
```

---

## 📋 Checklist de Deploy

- [ ] Proyecto Supabase creado
- [ ] Schema SQL ejecutado
- [ ] Variables de entorno configuradas
- [ ] `.env.local` creado (NO commitearlo)
- [ ] Repo en GitHub
- [ ] Vercel conectado
- [ ] Variables de entorno en Vercel
- [ ] URL de Supabase actualizada en auth callback
- [ ] App funciona en https://tudominio.vercel.app
- [ ] Instalable en celular como PWA

---

## 📝 TODO (Próximas mejoras)

- [ ] Conectar a Supabase real (reemplazar localStorage)
- [ ] Autenticación con email (magic link)
- [ ] Dark mode (aunque ya está implementado)
- [ ] Gráficos de progreso (Chart.js o Recharts)
- [ ] Exportar datos (PDF, JSON)
- [ ] Sincronización en tiempo real entre dispositivos
- [ ] Notificaciones de recordatorio
- [ ] Integración con Google Calendar
- [ ] Análisis de productividad

---

## 📄 Licencia

MIT License - libre de usar y modificar

---

## 💬 Soporte

Si tienes preguntas:

1. Revisa [DEPLOYMENT.md](./DEPLOYMENT.md) para errores de deploy
2. Verifica `.env.local` está configurado
3. Mira los logs en Vercel → Deployments
4. Revisa la consola del navegador (F12)

---

## 🎓 Hecho para

**Félix** - Estudiante de ITC con metas ambiciosas en:
- **ITC**: Nivel Senior Engineer
- **Astrofísica**: Contribución real al campo
- **Físico**: Disciplina y mejora continua
- **Japonés**: Entender anime sin subtítulos

El plan completo está en el PDF del itinerario de 12 meses.

---

**Bitácora**: Tu compañera diaria en el viaje hacia tus metas. 🚀
