# Guía de Despliegue - Bitácora Félix

## Stack Completo

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Database**: Supabase (PostgreSQL free tier)
- **Deploy**: Vercel (free tier)
- **Auth**: Supabase Magic Link (email)
- **Total costo**: **$0/mes**

---

## Paso 1: Configurar Supabase (10 minutos)

### 1.1 Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y haz click en "Sign Up"
2. Crea una cuenta con GitHub o email
3. Haz click en "New Project"
4. Completa:
   - **Project Name**: `bitacora`
   - **Password**: (guarda esto, lo necesitarás después)
   - **Region**: `us-east-1` (más cercana a ti es mejor)
   - **Pricing Plan**: `Free`
5. Espera a que se cree (5-10 minutos)

### 1.2 Ejecutar el Schema SQL

1. Ve a **SQL Editor** en el panel izquierdo
2. Haz click en **New Query**
3. Copia todo el contenido de `supabase/migrations/001_initial_schema.sql`
4. Pégalo en el editor
5. Haz click en **Run**
6. Deberías ver ✓ sin errores

### 1.3 Obtener tus Credenciales

1. Ve a **Settings** → **API** (en el panel izquierdo)
2. Copia estas tres cosas:
   ```
   Project URL: https://xxxx.supabase.co
   Anon Key: eyJhbG...
   Service Role Key: eyJhbG...
   ```
3. Guárdalas en un lugar seguro (las necesitarás en el próximo paso)

### 1.4 Configurar URL Callback para Auth

1. Ve a **Authentication** → **URL Configuration** (en el panel izquierdo)
2. En la sección **Redirect URLs**, añade:
   - Durante desarrollo: `http://localhost:3000`
   - Después del deploy: `https://tudominio.vercel.app`

---

## Paso 2: Clonar y Configurar el Proyecto (5 minutos)

### 2.1 Clonar desde GitHub

```bash
git clone https://github.com/[tu-usuario]/bitacora.git
cd bitacora
```

### 2.2 Instalar Dependencias

```bash
npm install
```

### 2.3 Crear .env.local

1. Copia el archivo `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Abre `.env.local` en tu editor

3. Reemplaza los valores con los que copiaste de Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
   ```

4. **Guarda el archivo** y **NO lo subas a GitHub** (ya está en `.gitignore`)

### 2.4 Pruebalo Localmente

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador. Deberías ver la app funcionando.

---

## Paso 3: Desplegar en Vercel (5 minutos)

### 3.1 Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit: bitacora app"
git branch -M main
git remote add origin https://github.com/[tu-usuario]/bitacora.git
git push -u origin main
```

### 3.2 Conectar en Vercel

1. Ve a [vercel.com](https://vercel.com) y haz click en "Sign Up"
2. Selecciona "Continue with GitHub"
3. Autoriza Vercel con tu GitHub
4. En el dashboard, haz click en **New Project**
5. Busca y selecciona tu repo `bitacora`
6. Haz click en **Import**

### 3.3 Agregar Variables de Entorno

En la sección "Environment Variables", agrega:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbG...
SUPABASE_SERVICE_ROLE_KEY = eyJhbG...
```

Haz click en **Deploy**

### 3.4 Esperar a que se Despliegue

- Vercel te mostrará un enlace como `https://bitacora-xxxx.vercel.app`
- Espera ~2-3 minutos a que termine
- Haz click en el enlace para probar

### 3.5 Actualizar URL en Supabase

Vuelve a Supabase:
1. **Authentication** → **URL Configuration**
2. En **Redirect URLs**, agrega tu URL de Vercel:
   ```
   https://bitacora-xxxx.vercel.app
   ```

---

## Paso 4: Instalar en tu Celular como PWA (2 minutos)

### En Chrome Mobile

1. Abre tu app en el navegador Chrome del celular
2. Toca el menú (⋮) en la esquina superior derecha
3. Selecciona **"Instalar aplicación"** o **"Agregar a pantalla de inicio"**
4. La app ahora se abre como una app nativa

### En Safari (iOS)

1. Abre la app en Safari
2. Toca **Compartir** (el ícono de flecha)
3. Selecciona **"Agregar a pantalla de inicio"**
4. Toca **Agregar**

---

## Paso 5: Conectarse a Supabase desde la App (OPCIONAL)

Por ahora, la app guarda datos en **localStorage** (memoria del navegador). Para persistencia real y acceso desde múltiples dispositivos:

1. Instala Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Crea un archivo `lib/supabase/server.ts` (ya existe `client.ts`)

3. Reemplaza las llamadas de localStorage con queries a Supabase

Esto requiere cambios en las páginas, pero el arquitectura ya está diseñada para esto.

---

## Actualizaciones Futuras

Para actualizar tu app después del despliegue inicial:

```bash
# Haz cambios localmente
npm run dev  # Prueba

# Sube a GitHub
git add .
git commit -m "Describe tu cambio"
git push origin main

# Vercel auto-despliega automáticamente
```

---

## Troubleshooting

### Error: "Cannot find module @supabase/supabase-js"

```bash
npm install @supabase/supabase-js
```

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"

- Verifica que `.env.local` existe
- Verifica que tienes las 3 variables
- Reinicia el servidor: `npm run dev`

### Error: "RLS policy violation"

- En Supabase, ve a **Authentication** y verifica que Row Level Security está habilitado
- Verifica que el usuario está autenticado

### La app funciona localmente pero no en Vercel

- Verifica que agregaste las variables de entorno en Vercel
- Verifica que el URL de Supabase está agregado en URL Configuration
- En Vercel, ve a **Deployments** y mira los **Logs** para errores

---

## Costo en 3, 6, 12 meses

| Servicio | Free Tier | Límite | Costo si lo excedes |
|---|---|---|---|
| Supabase | 500MB DB | Suficiente para 1 año de datos | $0 si no lo excedes |
| Vercel | Gratuito | Unlimited deploys | $0 (siempre gratuito) |
| **Total** | **$0/mes** | — | **$0/mes** |

---

## Siguiente Paso: Conectar a Supabase Real

Por ahora, los datos se guardan en localStorage (solo en tu navegador). Cuando quieras que funcione en múltiples dispositivos/navegadores:

1. Reemplaza localStorage con Supabase queries en las páginas
2. Implementa autenticación real con email
3. Usa Server Actions de Next.js para queries seguras

El esquema SQL ya está listo, solo necesita las queries.

---

## Soporte

Si tienes problemas:

1. Verifica que `.env.local` está correcto
2. Mira los **logs** de Vercel (Deployments → tu deploy → Logs)
3. Mira la **consola del navegador** (F12)
4. Verifica que el SQL de Supabase no tiene errores

¡Éxito! 🚀
