/**
 * Site Configuration
 * Single source of truth for site metadata
 * Based on PRD.md Appendix A
 */

export const SITE_CONFIG = {
  name: 'Luis Gómez',
  title: 'Frontend Engineer',
  tagline: 'Building systems that scale. Shipping products that matter.',
  url: 'https://luisgomez.dev',
  locale: 'en',
  author: {
    name: 'Luis Gómez',
    email: 'luisfgomezortiz@gmail.com',
  },

  // Pixel background display mode
  // 'guided' = pixels between edge guides, gradient fade at bottom (recommended)
  // 'none' = no pixel background
  pixelBackgroundMode: 'guided' as 'guided' | 'none',
} as const

export type SiteConfig = typeof SITE_CONFIG
