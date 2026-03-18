/**
 * Experience Data
 * Centralized experience/impact data
 * Order: Most recent first (EdTech → Telecom → Recycling)
 */

export const EXPERIENCE = {
  summary:
    '4+ years building web applications with React, TypeScript, and modern tooling. From inventory systems to SaaS platforms to education portals.',
  metrics: [
    {
      value: '3',
      label: 'Companies',
      description: 'From startups to telecom, shipping production applications',
    },
    {
      value: '1',
      label: 'UI Library',
      description:
        'Component library ensuring consistency across multiple apps',
    },
    {
      value: '4+',
      label: 'Years Experience',
      description: 'Frontend development with React ecosystem',
    },
  ],
  impacts: [
    // EdTech (Current/Most Recent)
    {
      title: 'Language Learning Platform',
      company: 'Clasing',
      description:
        'Built comprehensive portals for students and teachers in an online language learning platform. Established best practices and coding standards that became the foundation for all future development.',
      tags: ['React', 'Next.js', 'TypeScript', 'Architecture'],
    },
    {
      title: 'Enterprise Business Manager',
      company: 'Clasing',
      description:
        "Developed a B2B platform where enterprise customers can track their employees' learning progress, behavior, and performance metrics within the language learning platform.",
      tags: ['React', 'Next.js', 'B2B', 'Analytics'],
    },
    {
      title: 'Internal UI Component Library',
      company: 'Clasing',
      description:
        'Created a UI library inspired by shadcn/ui through reverse engineering. Ensured consistent look, feel, and accessibility across all company applications.',
      tags: ['React', 'Component Library', 'Accessibility', 'Design System'],
    },
    {
      title: 'BackOffice Migration',
      company: 'Clasing',
      description:
        'Coordinated the migration of legacy BackOffice to modern stack. Improved maintainability, developer experience, and set patterns for scalable development.',
      tags: ['Migration', 'Architecture', 'Coordination'],
    },
    // Telecom
    {
      title: 'Fiber Network Management SaaS',
      company: 'Full Solution Telecom',
      description:
        'Led a team of 3 developers to ship a SaaS platform for telecom companies. Managed fiber optic network equipment, user services, and billing through a friendly interface.',
      tags: ['React', 'Team Lead', 'SaaS'],
    },
    // Recycling (First job)
    {
      title: 'Inventory & Material Tracking',
      company: 'Areya ESP',
      description:
        'First professional project. Built a MERN stack web app for a recycling company to track inventory and materials through the recycling process.',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
  ],
} as const

export type Metric = (typeof EXPERIENCE.metrics)[number]
export type Impact = (typeof EXPERIENCE.impacts)[number]
