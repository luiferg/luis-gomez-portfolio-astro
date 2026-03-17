/**
 * Experience Data
 * Centralized experience/impact data
 */

export const EXPERIENCE = {
  summary: "4+ years building web applications with React, TypeScript, and modern tooling.",
  metrics: [
    {
      value: "2",
      label: "Platforms Built",
      description: "End-to-end web applications from architecture to deployment",
    },
    {
      value: "1",
      label: "UI Library",
      description: "Component library used across multiple Next.js applications",
    },
    {
      value: "4+",
      label: "Years Experience",
      description: "Frontend development with React ecosystem",
    },
  ],
  impacts: [
    {
      title: "Education Platform",
      description: "Built a comprehensive web application for students and teachers to conduct online classes. Led the migration from legacy systems to a modern stack, improving maintainability and developer experience.",
      tags: ["React", "Next.js", "TypeScript", "Architecture"],
    },
    {
      title: "Design System",
      description: "Created a reusable UI library ensuring consistency across all company applications. Established component patterns and documentation for future development.",
      tags: ["React", "Component Library", "Design Tokens"],
    },
    {
      title: "Team Leadership",
      description: "Coordinated and mentored a small team of developers, establishing code standards and implementing clean architecture patterns for scalable feature development.",
      tags: ["Leadership", "Architecture", "Mentoring"],
    },
  ],
} as const;

export type Metric = typeof EXPERIENCE.metrics[number];
export type Impact = typeof EXPERIENCE.impacts[number];
