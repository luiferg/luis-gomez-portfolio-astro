import { Resend } from "resend"

let cached: Resend | undefined

/**
 * Lazy-init Resend client. Returns null if RESEND_API_KEY is not set, so
 * callers can fail silently when email is not configured (e.g. in dev).
 */
export function getResend(): Resend | null {
  if (cached) return cached
  const key = import.meta.env.RESEND_API_KEY
  if (!key) return null
  cached = new Resend(key)
  return cached
}

export function getEmailConfig() {
  return {
    from: import.meta.env.EMAIL_FROM ?? "notifications@luisgomez.dev",
    adminEmail: import.meta.env.ADMIN_NOTIFICATION_EMAIL,
    portfolioUrl:
      import.meta.env.PORTFOLIO_PUBLIC_URL ?? "https://luisgomez.dev",
    briefingAdminUrl: import.meta.env.BRIEFING_ADMIN_URL ?? null,
  }
}
