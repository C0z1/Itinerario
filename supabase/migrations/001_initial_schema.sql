-- =============================================
-- HABITS: definicion de los 6 habitos fijos
-- =============================================
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  area TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- HABIT_LOGS: registro diario de habitos
-- =============================================
CREATE TABLE habit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  UNIQUE(habit_id, log_date)
);

-- =============================================
-- TASKS: tareas por area
-- =============================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  area TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT
);

-- =============================================
-- DAILY_LOGS: nota de texto libre del dia
-- =============================================
CREATE TABLE daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_date DATE NOT NULL UNIQUE DEFAULT CURRENT_DATE,
  day_version TEXT DEFAULT 'A',
  content TEXT,
  mood INTEGER CHECK (mood BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- MILESTONES: indicadores mensuales por area
-- =============================================
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  year INTEGER NOT NULL,
  area TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  evidence TEXT,
  UNIQUE(month, year, area, title)
);

-- =============================================
-- Row Level Security (simple - all authenticated users can access)
-- =============================================
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_authenticated" ON habits FOR ALL TO authenticated USING (true);
CREATE POLICY "allow_all_authenticated" ON habit_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "allow_all_authenticated" ON tasks FOR ALL TO authenticated USING (true);
CREATE POLICY "allow_all_authenticated" ON daily_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "allow_all_authenticated" ON milestones FOR ALL TO authenticated USING (true);

-- =============================================
-- SEED: los 6 habitos fijos
-- =============================================
INSERT INTO habits (name, area, icon, sort_order) VALUES
  ('Astrofísica', 'astrofisica', '🔭', 1),
  ('Programación', 'itc', '💻', 2),
  ('Físico', 'fisico', '🏋️', 3),
  ('Mental', 'mental', '🧘', 4),
  ('Japonés', 'japones', '🇯🇵', 5),
  ('Enfoque', 'enfoque', '🎯', 6);
