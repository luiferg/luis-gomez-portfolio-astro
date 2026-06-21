/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_SECRET_KEY: string
  readonly BRIEF_COOKIE_SECRET: string
  readonly RESEND_API_KEY?: string
  readonly EMAIL_FROM?: string
  readonly ADMIN_NOTIFICATION_EMAIL?: string
  readonly BRIEFING_ADMIN_URL?: string
  readonly PORTFOLIO_PUBLIC_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
