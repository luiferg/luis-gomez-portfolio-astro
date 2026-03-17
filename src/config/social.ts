/**
 * Social Links Configuration
 * Single source of truth for external links
 * Based on PRD.md Appendix A
 */

export const SOCIAL_LINKS = {
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-username',
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;
