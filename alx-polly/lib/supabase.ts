import { createClient } from '@supabase/supabase-js';

// These should be securely loaded from environment variables
// For local development, you can place them in a .env.local file
// NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase URL or Anon Key. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
