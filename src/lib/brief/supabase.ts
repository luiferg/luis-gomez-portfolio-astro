import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let cached: SupabaseClient | undefined

/**
 * Server-only Supabase client using the secret key. Bypasses RLS.
 *
 * NEVER import this from a "use client" file or from anywhere the bundle
 * ships to the browser. Astro endpoints and SSR `.astro` files only.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached
  const url = import.meta.env.SUPABASE_URL
  const key = import.meta.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SECRET_KEY must be set in the environment.",
    )
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}
