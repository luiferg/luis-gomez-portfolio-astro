/**
 * SEO Configuration
 * Single source of truth for SEO metadata
 * Based on PRD.md Appendix A
 * 
 * Note: OG images should be generated as PNG for best compatibility
 * Currently using SVG placeholders - replace with real images
 */

import { SITE_CONFIG } from './site';

export const SEO_DEFAULTS = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.tagline,
  ogImage: '/og/default.svg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
} as const;

export const PAGE_SEO = {
  home: {
    ...SEO_DEFAULTS,
  },
  blog: {
    title: `Blog | ${SITE_CONFIG.name}`,
    description: 'Thoughts on architecture, frontend, and shipping products.',
    ogImage: '/og/default.svg',
  },
  notFound: {
    title: `404 | ${SITE_CONFIG.name}`,
    description: 'Page not found.',
  },
} as const;

export type PageSeo = typeof PAGE_SEO;
