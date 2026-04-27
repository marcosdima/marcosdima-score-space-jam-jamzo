import { createClient } from '@supabase/supabase-js';

const hasSupabaseConfig = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
const createDefaultUsername = () => `User${Math.floor(Math.random() * 10000)}`;

export const normalizeScoreEntry = (entry = {}) => {
  const normalizedUsername = typeof entry.username === 'string' ? entry.username.trim() : '';
  const parsedScore = Number(entry.score ?? entry.result ?? 0);
  const normalizedScore = Number.isFinite(parsedScore) ? parsedScore : 0;

  return {
    username: normalizedUsername || createDefaultUsername(),
    created_at: typeof entry.created_at === 'string' && entry.created_at.trim()
      ? entry.created_at.trim()
      : new Date().toISOString(),
    score: Math.min(Math.max(normalizedScore, 0), 1000000),
  };
};

const getSupabase = () => {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase is not configured.');
  }

  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
  );
};

export const saveScore = async (entry) => {
  const supabase = getSupabase();
  const normalizedEntry = normalizeScoreEntry(entry);

  const { error } = await supabase.from('results').insert([normalizedEntry]);

  if (error) {
    throw new Error(error.message || 'Failed to save score in Supabase.');
  }

  return normalizedEntry;
};

export const getTopResults = async () => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('results')
    .select('*')
    .order('score', { ascending: false })
    .limit(10);

  if (error) {
    throw new Error(error.message || 'Failed to fetch scores from Supabase.');
  }

  if (!data || data.length === 0) {
    if (import.meta.env.DEV) {
      console.warn('Supabase top scores returned an empty array. If you expect rows, verify SELECT/RLS policies and table data.');
    }
    return [];
  }

  return (data || []).map((entry) => normalizeScoreEntry(entry));
};
