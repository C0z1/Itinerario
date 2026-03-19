# Architecture Documentation

## Overview

Bitácora is a Next.js 14 application with a professional terminal-inspired interface for tracking a 12-month personal itinerary across 4 life areas.

## System Architecture

```
┌─────────────────────────────────────┐
│         Next.js 14 Frontend         │
│  (React 18 + TypeScript + Tailwind) │
└────────────┬────────────────────────┘
             │
       Server Actions
             │
┌────────────▼────────────────────────┐
│      Supabase PostgreSQL            │
│  (habits, tasks, logs, milestones)  │
└─────────────────────────────────────┘
```

## Directory Structure Rationale

### `/app`
Next.js 14 App Router directory.
- **layout.tsx** - Root layout with boot screen and PWA meta tags
- **today/page.tsx** - Main dashboard (most visited)
- **tasks/**, **progress/**, **log/** - Secondary pages

### `/components`
Reusable React components, organized by function:
- **layout/** - Shared components (nav, frame, boot screen)
- **today/** - Dashboard-specific components (plan, habits, modal)

### `/lib`
Business logic and utilities:
- **constants/** - Static data (12-month curriculum, schedules)
- **actions/** - Server Actions for Supabase mutations
- **supabase/** - Database clients

### `/public`
Static assets and PWA manifest.

### `/supabase`
Database migrations and RLS policies.

## Component Hierarchy

```
RootLayout
├── BootScreenWrapper
│   ├── RobcoBootScreen (startup sequence)
│   └── Children
│
├── PipboyFrame (visual container)
│   ├── DailyPlan (current/next activity)
│   ├── HabitChecklist (6 daily habits)
│   ├── QuickLogInput (daily notes)
│   ├── AreaDetailsModal (curriculum details)
│   └── ScheduleTimeline (hourly schedule)
│
└── BottomNav (mobile navigation)
```

## Data Flow

### Habit Tracking
```
User Click
    ↓
HabitChecklist Component
    ↓
toggleHabit Server Action
    ↓
Supabase habit_logs table
    ↓
Optimistic UI update
    ↓
localStorage fallback
```

### Daily Plan Display
```
DailyPlan Component
    ↓
Current time calculation
    ↓
Schedule lookup (A or B version)
    ↓
Current month + area milestones
    ↓
Real-time display
```

## Database Schema

### habits
```sql
id (UUID)
name (TEXT) - "Astrofísica", "Programación", etc.
area (TEXT) - astrofisica, itc, fisico, japones, mental, enfoque
icon (TEXT)
sort_order (INTEGER)
created_at (TIMESTAMPTZ)
```

### habit_logs
```sql
id (UUID)
habit_id (UUID FK)
log_date (DATE)
completed (BOOLEAN)
completed_at (TIMESTAMPTZ)
UNIQUE(habit_id, log_date)
```

### tasks
```sql
id (UUID)
title (TEXT)
area (TEXT)
priority (TEXT)
due_date (DATE)
completed (BOOLEAN)
created_at (TIMESTAMPTZ)
```

### daily_logs
```sql
id (UUID)
log_date (DATE UNIQUE)
day_version (TEXT) - 'A' or 'B'
content (TEXT)
mood (INTEGER 1-5)
created_at, updated_at (TIMESTAMPTZ)
```

### milestones
```sql
id (UUID)
month (INTEGER 1-12)
year (INTEGER)
area (TEXT)
title (TEXT)
completed (BOOLEAN)
evidence (TEXT)
UNIQUE(month, year, area, title)
```

## Server Actions Pattern

All mutations use Next.js Server Actions:

```typescript
'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(URL, SERVICE_ROLE_KEY)

export async function toggleHabit(habitName: string, date: string) {
  try {
    // 1. Look up habit by name
    // 2. Upsert to habit_logs
    // 3. Return success
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
```

**Benefits:**
- Direct server-side database access (no API layer)
- Type-safe client-server communication
- No credential exposure to client
- Automatic form handling

## State Management

**Local State:** React `useState` hooks
- Current time
- Modal open/closed state
- Day version (A/B)

**Persistent State:** Supabase
- Habit completions
- Tasks
- Daily logs
- Milestones

**Fallback:** localStorage
- Habit data (offline support)
- Day version preference

## Real-time Features

### Time-based Updates
```typescript
useEffect(() => {
  const updateTime = () => setCurrentTime(new Date())
  updateTime()
  const timer = setInterval(updateTime, 60000) // 1 minute
  return () => clearInterval(timer)
}, [])
```

Result: Current activity block updates as time passes.

### Month-based Display
```typescript
const currentMonth = new Date().getMonth() + 1 // 1-12
const milestone = MILESTONES[currentMonth - 1]
```

Result: Monthly objectives change on calendar month change.

## Styling System

### Tailwind Configuration
```javascript
theme: {
  extend: {
    colors: {
      vault: { /* yellows */ },
      radiation: { /* greens */ },
      oxide: { /* oranges */ },
    },
    fontFamily: {
      fallout: ['VT323', 'monospace'],
    },
  },
}
```

### Color Palette
- **Text:** `text-green-400` (bright green)
- **Borders:** `border-green-600` to `border-green-700`
- **Background:** `bg-gray-900` (dark)
- **Active:** `shadow-green-500/50` (glow effect)

### Terminal Aesthetic
- Monospace font (VT323)
- Limited color palette (green + black)
- Minimal spacing
- Subtle shadows (no heavy drop shadows)
- Linear borders (no excessive rounding)

## Performance Optimizations

1. **Static Generation**
   - Schedule data (constant)
   - Curriculum data (constant)
   - Compiled at build time

2. **Incremental Static Regeneration (ISR)**
   - Daily logs (revalidate every 60 seconds)
   - Habit data (revalidate on demand)

3. **Client-side Caching**
   - localStorage for offline support
   - Supabase real-time subscriptions (future)

4. **Code Splitting**
   - Modal components lazy-loaded
   - Layout components in shared bundle

## Security Model

### Row Level Security (RLS)
All tables have RLS enabled:
```sql
CREATE POLICY "authenticated_access" 
ON habits FOR ALL 
TO authenticated 
USING (true)
```

Note: Currently allowing all authenticated users.
For multi-user: Add user_id columns and restrict by user.

### Authentication (Future)
- Supabase Auth with GitHub/Google/Email
- User isolation via RLS
- Session management via Next.js middleware

### Current State
- Public tables (no authentication required)
- Designed to support auth layer
- Service role key only on server (Server Actions)

## Deployment Architecture

### Vercel (Recommended)
- Automatic deployments from GitHub
- Environment variables via Vercel dashboard
- Edge functions for Server Actions
- CDN for static assets

### Environment Variables
```env
# Public
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

# Server only
SUPABASE_SERVICE_ROLE_KEY
```

## Future Enhancements

1. **Authentication**
   - User account system
   - Multi-device sync

2. **Real-time Sync**
   - Supabase real-time subscriptions
   - Offline-first support

3. **Advanced Features**
   - Weekly review prompts
   - Analytics dashboard
   - Goal tracking
   - Community features

4. **Mobile App**
   - React Native version
   - Push notifications
   - Biometric auth

## Testing Strategy

- **Unit:** Component behavior
- **Integration:** Server Actions
- **E2E:** User workflows (Playwright)

## Monitoring & Analytics

Current: None (privacy-first)

Future:
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)

---

**Architecture Design Principles:**
- Simple, maintainable code
- Type safety (TypeScript)
- Professional design
- Privacy-first
- Offline-capable
- Mobile-friendly
