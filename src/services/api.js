import { createClient } from '@supabase/supabase-js';

const hasSupabaseConfig = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

const getSupabase = () => {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase is not configured.');
  }

  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
  );
};

export const saveScore = async ({ username = 'me', created_at = new Date().toISOString(), score }) => {
  const supabase = getSupabase();
  await supabase.from('results').insert([{ username, created_at, score }]);
};

export const getTopResults = async () => {
  const supabase = getSupabase();

  const { data } = await supabase
    .from('results')
    .select('*')
    .order('score', { ascending: false })
    .limit(10);

  return data || [];
};

export const saveResult = async (name, score) => {
  return saveScore({ username: name, score });
};
