import { DEFAULT_LOCALE, type Locale } from "@/lib/brief-schemas/locale"
import { en, type Dict } from "./locales/en"
import { es } from "./locales/es"

const DICTS: Record<Locale, Dict> = { en, es }

export type { Dict }

/**
 * Get the full translation dictionary for the given locale.
 * Falls back to DEFAULT_LOCALE if the locale is unknown.
 */
export function getDict(locale: Locale | string | undefined | null): Dict {
  if (locale === "en" || locale === "es") return DICTS[locale]
  return DICTS[DEFAULT_LOCALE]
}
