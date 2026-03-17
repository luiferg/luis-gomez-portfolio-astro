/**
 * Site Configuration
 * Single source of truth for site metadata
 * Based on PRD.md Appendix A
 */

export const SITE_CONFIG = {
  name: "Luis Gómez",
  title: "Frontend Engineer",
  tagline: "Building systems that scale. Shipping products that matter.",
  url: "https://luisgomez.dev",
  locale: "en",
  author: {
    name: "Luis Gómez",
    email: "hello@luisgomez.dev",
  },

  // Pixel background display mode
  // 'framed' = contained in bordered box (hero only)
  // 'full-bleed' = full viewport, fades out on scroll
  pixelBackgroundMode: "framed" as "framed" | "full-bleed",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
