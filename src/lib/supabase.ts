import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const gameEngineUrl = `${supabaseUrl}/functions/v1/game-engine`;
export const aiScenarioUrl = `${supabaseUrl}/functions/v1/ai-scenario`;

export const headers = {
  'Authorization': `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json',
};