// COPIED from briefing-admin/lib/schemas/locale.ts. Keep in sync by hand.
import { z } from "zod"

export const SUPPORTED_LOCALES = ["es", "en"] as const
export const localeSchema = z.enum(SUPPORTED_LOCALES)
export type Locale = z.infer<typeof localeSchema>

export const DEFAULT_LOCALE: Locale = "es"

export const LOCALE_LABELS: Record<Locale, string> = {
  es: "Espa\u00f1ol",
  en: "English",
}
