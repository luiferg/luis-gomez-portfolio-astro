/**
 * Experience Data
 * Centralized experience/impact data
 * Order: Most recent first
 */

type ExperienceImpact = {
  title: string
  company: string
  role: string
  description: string
  highlights: string[]
  tags: string[]
}

type ExperienceMetrics = {
  value: string
  label: string
  description: string
}

type ExperienceData = {
  summary: string
  metrics: ExperienceMetrics[]
  impacts: ExperienceImpact[]
}

export const EXPERIENCE: ExperienceData = {
  summary:
    '4+ years building web applications with React, TypeScript, and modern tooling. From inventory systems to SaaS platforms to education portals.',
  metrics: [
    {
      value: '4',
      label: 'Companies',
      description: 'From startups to telecom, shipping production applications',
    },
    {
      value: '47',
      label: 'Components',
      description: 'UI component library across multiple projects',
    },
    {
      value: '4+',
      label: 'Years Experience',
      description: 'Frontend development with React ecosystem',
    },
  ],
  impacts: [
    // Clasing - Language Learning Platform
    {
      title: 'Language Learning Platform',
      company: 'Clasing',
      role: 'Frontend Lead',
      description:
        'Built comprehensive portals for students and teachers in an online language learning platform. Established best practices and coding standards that became the foundation for all future development.',
      highlights: [
        'Student portal: class booking, progress tracking, video calls, Duolingo-style exercises, AI chat, and voice/text AI modules',
        'Teacher portal: availability management, class materials, student scoring, and group analytics',
        'Reduced build times from 15 min to 2 min through architecture improvements',
        '5 complex modules, 25+ routes, serving ~24k users',
        'Established folder structure, E2E testing (Playwright), unit tests, and code standards',
      ],
      tags: ['React', 'Next.js', 'TypeScript', 'Architecture'],
    },
    // Clasing - Enterprise Platform (BackOffice + Business Manager)
    {
      title: 'Enterprise Platform',
      company: 'Clasing',
      role: 'Frontend Lead',
      description:
        'Built the B2B platform and internal BackOffice for managing enterprise clients, their employees, and learning operations.',
      highlights: [
        'B2B dashboard for 1,000+ enterprise clients: completion rates, attendance, scores, contract/credit tracking',
        'Internal BackOffice: students, groups, companies, and content management',
        'Migrated from Next.js 12 + Sass to Next.js 16 + Tailwind + TanStack Query (SSR)',
        'Led 4-month migration while handling parallel projects',
        'DDD architecture patterns, Playwright + Vitest testing',
        'Report generation and export features for HR teams',
      ],
      tags: ['React', 'Next.js', 'B2B', 'DDD', 'Migration'],
    },
    // Clasing - UI Component Library
    {
      title: 'Internal UI Component Library',
      company: 'Clasing',
      role: 'Frontend Lead',
      description:
        'Created a UI library inspired by shadcn/ui through reverse engineering. Ensured consistent look, feel, and accessibility across all company applications.',
      highlights: [
        '47 components + 3 complex component blocks, used across 3 projects',
        'Full accessibility: keyboard nav, screen reader ready, dynamic ARIA states on form controls',
        'Improved Lighthouse score from 63 to 92 points',
        'Built Storybook + contribution docs for team adoption',
      ],
      tags: ['React', 'Component Library', 'Accessibility', 'Storybook'],
    },
    // Clasing - Marketing Website
    {
      title: 'Marketing Website',
      company: 'Clasing',
      role: 'Frontend Lead',
      description:
        'Developed the company marketing website with rich scroll animations, collaborating closely with the design team.',
      highlights: [
        'Next.js 16 + Tailwind + Motion.dev',
        'Complex scroll-driven animations working hand-in-hand with designer',
        'Zod + React Hook Form for all forms',
      ],
      tags: ['Next.js', 'Motion', 'Animations'],
    },
    // Full Solution - Telecom
    {
      title: 'Fiber Network Management SaaS',
      company: 'Full Solution',
      role: 'Tech Lead',
      description:
        'Led a team of 3 developers to ship a SaaS platform for telecom companies. Managed fiber optic network equipment, user services, and billing through a friendly interface.',
      highlights: [
        'Used by ~180 telecom companies across LATAM',
        'OLT configuration via SSH console, remote ONT management',
        'Service provisioning, cut/restore, invoice management',
        'MERN stack with vanilla CSS',
      ],
      tags: ['React', 'Node.js', 'Team Lead', 'SaaS'],
    },
    // Areya ESP - First job
    {
      title: 'Inventory & Material Tracking',
      company: 'Areya ESP',
      role: 'Frontend Developer',
      description:
        'First professional project. Built a MERN stack web app for a recycling company to track inventory and materials through the recycling process.',
      highlights: [
        'Solo project: full-stack development',
        'Tracked incoming/outgoing materials across warehouses (bodegas)',
        'Manual truck tracking, buyer/seller admin, basic analytics',
        'Report generation and downloads',
      ],
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
  ],
}

export type Metric = (typeof EXPERIENCE.metrics)[number]
export type Impact = (typeof EXPERIENCE.impacts)[number]
