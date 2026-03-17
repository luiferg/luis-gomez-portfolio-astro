# Luis Gómez Portfolio

Brutalist-pixel portfolio for a frontend engineer. Dark, textured, minimal.

## Stack

- **Astro 6** - Static site generator with islands architecture
- **React 19** - Interactive components (header, pixel background)
- **Tailwind CSS v4** - Utility-first styling
- **Motion** - Animations (Framer Motion replacement)
- **TypeScript** - Type safety

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── features/
│   │   ├── pixel-background/    # Animated pixel canvas
│   │   └── copy-email/          # Copy email button
│   ├── layout/
│   │   ├── header.tsx           # Navigation (scroll effects)
│   │   ├── footer.astro
│   │   ├── edge-guides.astro    # Vertical guide lines
│   │   └── section-border.astro
│   └── sections/
│       ├── hero.astro
│       ├── experience.astro
│       └── contact.astro
├── config/
│   ├── site.ts          # Site config (name, pixel mode)
│   ├── seo.ts           # SEO metadata
│   ├── social.ts        # Social links
│   └── experience.ts   # Experience data
├── content/
│   └── thoughts/        # Blog posts (markdown)
├── layouts/
│   └── base-layout.astro
├── pages/
│   ├── index.astro      # Home page
│   ├── blog/
│   │   ├── index.astro  # Blog listing
│   │   └── [slug].astro # Blog post
│   └── 404.astro
└── styles/
    └── global.css       # Tailwind theme + globals
```

## Configuration

### Site Config (`src/config/site.ts`)

```typescript
export const SITE_CONFIG = {
  name: "Luis Gómez",
  title: "Frontend Engineer",
  // Pixel background mode: 'guided' | 'none'
  pixelBackgroundMode: "guided",
}
```

### Adding Blog Posts

Create markdown files in `src/content/thoughts/`:

```markdown
---
title: "Your Post Title"
description: "A brief description"
publishedAt: 2026-03-15
tags: ["tag1", "tag2"]
draft: false  # Set to true to hide
---

Your content here...
```

## Features

- **View Transitions** - Smooth SPA-like page navigation
- **Pixel Background** - Animated canvas with gradient fade (configurable)
- **Scroll-aware Header** - Transparent → blurred on scroll
- **Content Collections** - Type-safe markdown blog
- **Brutalist Design** - Mono fonts, high contrast, minimal decoration

## Design System

- **Colors**: Deep blacks (#0a0a0a), purple accent tint for pixels
- **Fonts**: JetBrains Mono (headings/code), Geist (body)
- **Spacing**: Container-based with edge guides

## Deployment

Deploy to Vercel:

```bash
npm run build
# Deploy the dist/ folder
```

Or connect your GitHub repo to Vercel for automatic deploys.

## License

MIT
