import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase admin client.
 * Uses SUPABASE_SERVICE_ROLE_KEY for secure server-side mutations.
 * 
 * IMPORTANT:
 * - This file must NEVER be imported in client components.
 * - If environment variables are missing, it returns null and operates in development mode.
 */

let cachedAdminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  // If already initialized in runtime, reuse client
  if (cachedAdminClient) {
    return cachedAdminClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  try {
    cachedAdminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    return cachedAdminClient;
  } catch (error) {
    console.error("[Supabase Admin] Failed to initialize client:", error);
    return null;
  }
}

/**
 * Checks if Supabase persistence is fully configured in the environment.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
