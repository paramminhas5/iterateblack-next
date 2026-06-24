import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Server-side Supabase client for use in Server Components, generateMetadata,
 * and route handlers. Uses service-role or anon key depending on availability.
 *
 * This client runs ONLY on the server — never in the browser.
 */
export function createServerClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "[Supabase Server] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
    );
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false },
  });
}
