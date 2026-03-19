# Bitácora Personal - 12-Month Itinerary Tracker

A professional personal itinerary tracking application built with Next.js, Tailwind CSS, and Supabase. Track your daily progress across multiple life areas: Astrophysics, Technology, Physical Training, and Language Learning.

## 🎯 Overview

Bitácora is a personal journal and progress tracker designed to help you manage a comprehensive 12-month learning and development plan. It provides:

- **Real-time daily planning** with time-based activity tracking
- **Progress monitoring** across 4 major life areas
- **Habit tracking** with Supabase persistence
- **Monthly curriculum objectives** automatically adjusted based on current month
- **Professional terminal-style interface** with clean, distraction-free design

## ✨ Features

### Core Features
- 📅 **Daily Plan Display** - Shows current and next activities in real-time
- 🎓 **Multi-Area Curriculum** - 12-month learning paths for each discipline
- ✅ **Habit Tracking** - Track 6 core daily habits with Supabase sync
- 📊 **Progress Dashboard** - Visual progress indicators and monthly milestones
- 🔄 **Flexible Scheduling** - Two schedule versions (A & B) for different workload days
- 📱 **Mobile-Friendly** - PWA support for mobile installation

### Technical Features
- **Supabase Integration** - Real-time database with habit persistence
- **Server Actions** - Next.js 14 Server Actions for database operations
- **Type-Safe** - Full TypeScript support
- **Professional UI** - Terminal-inspired design with VT323 monospace font
- **Real-time Updates** - Dynamic schedule with hourly activity tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/C0z1/Itinerario.git
cd bitacora
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Setup Supabase database**
Run migration: `supabase/migrations/001_initial_schema.sql` in Supabase SQL Editor

5. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bitacora/
├── app/                          # Next.js App Router
│   ├── layout.tsx
│   ├── today/page.tsx           # Main dashboard
│   ├── tasks/page.tsx
│   ├── progress/page.tsx
│   └── log/page.tsx
│
├── components/
│   ├── layout/                  # Shared components
│   │   ├── BootScreenWrapper.tsx
│   │   ├── PipboyFrame.tsx
│   │   ├── RobcoBootScreen.tsx
│   │   └── ...
│   │
│   └── today/                   # Dashboard components
│       ├── DailyPlan.tsx
│       ├── AreaDetailsModal.tsx
│       ├── HabitChecklist.tsx
│       └── ...
│
├── lib/
│   ├── constants/
│   │   ├── itinerary.ts        # 12-month curriculum
│   │   ├── schedule.ts
│   │   ├── habits.ts
│   │   └── milestones.ts
│   │
│   ├── actions/                # Server Actions
│   │   ├── habits.ts
│   │   ├── tasks.ts
│   │   └── ...
│   │
│   └── supabase/
│       ├── client.ts
│       └── server.ts
│
├── public/                      # Static assets
├── supabase/migrations/         # Database migrations
├── docs/                        # Documentation
└── package.json
```

## 🛠️ Technology Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel (recommended)

## 📊 Database Schema

Tables: habits, habit_logs, tasks, daily_logs, milestones
All tables include Row Level Security (RLS) policies.

## 🎨 Design System

- **Color:** Terminal green (#22c55e) on dark background
- **Font:** VT323 (monospace)
- **Style:** Professional, minimal terminal aesthetic

## 📚 The 12-Month Plan

**4 Concurrent Areas:**

1. **Astrophysics** - Mathematics → Real research contribution
2. **Technology/ITC** - Advanced software engineering curriculum
3. **Physical Training** - 5 days/week, 2 hours/day fitness regimen
4. **Japanese** - Daily language learning (JLPT N4+ level)

Each area has monthly objectives and verifiable achievements.

## 🚀 Deployment

```bash
npm run build
vercel
```

## 📝 License

MIT License

## 🙌 Contributors

- Felix (Creator, 12-month itinerary design)
- Claude AI (Implementation & architecture)

---

**Consistent progress compounds exponentially. This tool maintains that consistency.**
