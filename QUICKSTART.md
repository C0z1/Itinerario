# ⚡ Quick Start - Bitácora Félix

Tu bitácora está lista. Aquí está el camino más rápido para tenerla funcionando.

---

## 🎯 Meta Final

Una app web de bitácora personal que:
- ✅ Puedes consultar desde el celular múltiples veces al día
- ✅ Rastrea tus 6 hábitos diarios
- ✅ Muestra tu horario actual (Versión A o B)
- ✅ Gestiona tareas por área (ITC, Astrofísica, Físico, Japonés)
- ✅ Sigue tu progreso con 48 milestones (12 meses × 4 áreas)
- ✅ Funciona offline (datos guardados localmente por ahora)

---

## 5 Pasos para Tenerla Funcionando

### 1️⃣ Instalar dependencias (2 minutos)

```bash
cd c:/Users/felix/Downloads/bitacora
npm install
```

### 2️⃣ Probar localmente (30 segundos)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**Deberías ver:**
- Hoy: Hábitos + Horario (Version A)
- Tareas: Agregar/eliminar por área
- Progreso: Milestones del mes
- Log: Historial (vacío por ahora)

### 3️⃣ Jugar con la app (5 minutos)

- ✓ Marca algunos hábitos
- ✓ Agrega una tarea
- ✓ Cambia a Versión B (ver horario diferente)
- ✓ Escribe una nota en Log del Día
- ✓ Ve a Progreso y marca un milestone

**Los datos se guardan en localStorage** (memoria del navegador).

### 4️⃣ Opcionalmente: Deploy en Vercel (15 minutos)

Cuando esté listo para que funcione en producción con Supabase real:

```bash
# 1. Sube a GitHub
git init
git add .
git commit -m "Initial bitacora app"
git push origin main

# 2. Ve a vercel.com
# Conecta tu repo de GitHub
# Vercel auto-deploya
```

**Ver instrucciones detalladas en [DEPLOYMENT.md](./DEPLOYMENT.md)**

### 5️⃣ Usar en tu celular ahora (1 minuto)

#### Opción A: Acceso remoto (desarrollo)

```bash
# En tu computadora, en la carpeta del proyecto:
npm run dev

# Luego abre: http://[tu-ip-local]:3000
# Desde el celular en la misma wifi
```

#### Opción B: Como PWA (después del deploy en Vercel)

1. Abre tu app en Chrome del celular
2. Menú (⋮) → "Instalar aplicación"
3. Se abre como app nativa

---

## 📝 Estructura de Datos (Hoy)

La app ya viene pre-configurada con:

### 6 Hábitos diarios (fijos)
- 🔭 Astrofísica
- 💻 Programación
- 🏋️ Físico
- 🧘 Mental
- 🇯🇵 Japonés
- 🎯 Enfoque

### 4 Áreas de tareas
- **ITC**: Ingeniería en Tecnologías Computacionales
- **Astrofísica**: Estudio de astrophysics
- **Físico**: Entrenamientos, fitness
- **Japonés**: Idioma, anime, manga

### 2 Versiones de horario

**Versión A** (día normal):
```
7-11   Estudio mañana
11-13  Comida / descanso
13-15  Gym
15-19  Clases ITC
19-21  Tareas noche
```

**Versión B** (carga alta ITC):
```
7-9    ITC intensivo
9-11   Astrofísica
11-13  Comida / Repasar
13-15  Gym (si es posible)
15-21  ITC bloq. tarde/noche
```

### 48 Milestones del itinerario

Basados en tu PDF de 12 meses:
- **Mes 1-3**: Fundamentos (algoritmos, gravedad, hiragana, entrenamiento)
- **Mes 4-6**: Consolidación (BD, astronomía, JLPT N5)
- **Mes 7-9**: Avanzado (ML, relatividad, N4 Japanese)
- **Mes 10-12**: Contribución real (AstroPy, portafolio, anime sin subtítulos)

---

## 📁 Archivos Importantes

| Archivo | Qué hace |
|---|---|
| `app/today/page.tsx` | Pantalla principal (la que más usarás) |
| `app/tasks/page.tsx` | Gestión de tareas |
| `app/progress/page.tsx` | Milestones del mes |
| `app/log/page.tsx` | Historial |
| `lib/constants/schedule.ts` | Horarios Version A y B |
| `lib/constants/milestones.ts` | 48 milestones del itinerario |
| `supabase/migrations/001_initial_schema.sql` | Schema de base de datos (para Supabase) |

---

## 🔄 Próximos Pasos (Opcionales)

Una vez que uses la app por unos días y estés feliz:

1. **Conectar Supabase real**
   - Crea proyecto en supabase.com (free tier)
   - Ejecuta el SQL schema
   - Reemplaza localStorage con queries a Supabase
   - Ahora funciona en múltiples dispositivos

2. **Agregar autenticación**
   - Magic link (email) o Google Sign-In
   - Solo tú puedes acceder tus datos

3. **Agregar gráficos**
   - Chart.js para visualizar progreso
   - Streak counter para hábitos

---

## ❓ Troubleshooting

### Error: "npm: command not found"

Necesitas instalar Node.js: https://nodejs.org (descargar LTS)

### La app se ve rara en el celular

- Abre en Chrome (mejor soporte para PWA)
- Si es en localhost, asegúrate de usar la IP local correcta

### Los datos desaparecieron

- localStorage se borra si limpias el navegador
- Por eso el plan futuro es Supabase (datos en servidor)

### Error en `npm run dev`

```bash
# Limpia y reinstala
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🎬 Ahora Qué

1. **Ejecuta** `npm run dev`
2. **Abre** http://localhost:3000
3. **Juega** con la app
4. **Usa** desde tu celular
5. **Cuando esté listo**, sigue [DEPLOYMENT.md](./DEPLOYMENT.md) para Vercel + Supabase

---

## 💬 Stack Resumido

```
Frontend:    Next.js 14 + Tailwind CSS
Database:    localStorage (ahora) → Supabase (después)
Deploy:      npm run dev (ahora) → Vercel (después)
Mobile:      Funciona en cualquier navegador (PWA cuando esté en Vercel)
Cost:        $0
```

---

**¡Listo! Tu bitácora está lista para usar. 🚀**

Consulta la app múltiples veces al día, marca tus hábitos, agrega tareas y rastrea tu progreso en el itinerario de 12 meses.

Cuando quieras desplegarlo en producción (para acceso desde múltiples dispositivos), sigue [DEPLOYMENT.md](./DEPLOYMENT.md).
