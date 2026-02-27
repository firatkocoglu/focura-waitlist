import { createClient } from '@supabase/supabase-js';

export const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      `Missing Supabase env. URL(${Boolean(process.env.SUPABASE_URL)}|${Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL
      )}) KEY(${Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)}|${Boolean(
        process.env.SUPABASE_SERVICE_KEY
      )})`
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
