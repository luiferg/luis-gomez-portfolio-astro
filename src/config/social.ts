/**
 * Social Links Configuration
 * Single source of truth for external links
 * Based on PRD.md Appendix A
 */

export const SOCIAL_LINKS = {
  github: 'https://github.com/luiferg',
  linkedin: 'https://www.linkedin.com/in/luisgomez31/',
} as const

export type SocialPlatform = keyof typeof SOCIAL_LINKS
