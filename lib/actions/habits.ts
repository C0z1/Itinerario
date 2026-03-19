'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function toggleHabit(habitName: string, date: string) {
  try {
    // Look up habit by name to get UUID
    const { data: habit } = await supabase
      .from('habits')
      .select('id')
      .eq('name', habitName)
      .single();

    if (!habit) {
      throw new Error(`Habit not found: ${habitName}`);
    }

    // Get current status
    const { data: existing } = await supabase
      .from('habit_logs')
      .select('*')
      .eq('habit_id', habit.id)
      .eq('log_date', date)
      .single();

    if (existing) {
      // Update
      const { error } = await supabase
        .from('habit_logs')
        .update({
          completed: !existing.completed,
          completed_at: !existing.completed ? new Date().toISOString() : null,
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Create
      const { error } = await supabase
        .from('habit_logs')
        .insert({
          habit_id: habit.id,
          log_date: date,
          completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error toggling habit:', error);
    return { success: false, error };
  }
}

export async function getHabitsForDate(date: string) {
  try {
    const { data, error } = await supabase
      .from('habit_logs')
      .select('*, habits(id, name)')
      .eq('log_date', date);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching habits:', error);
    return { data: null, error };
  }
}
