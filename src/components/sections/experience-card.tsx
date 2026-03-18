/**
 * Experience Card Component
 * Expandable card showing experience details
 * Following Emil's approach: fast, subtle, purposeful
 */

import { useState } from 'react'

interface ExperienceCardProps {
  title: string
  company: string
  role: string
  description: string
  highlights: string[]
  tags: string[]
}

export function ExperienceCard({
  title,
  company,
  role,
  description,
  highlights,
  tags,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className='border border-border hover:border-accent/50 transition-colors duration-200'>
      <button
        type='button'
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full text-left p-6 md:p-8 group'
        aria-expanded={isExpanded}
      >
        {/* Header row */}
        <div className='flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3'>
          <h3 className='font-mono text-xl font-bold group-hover:text-secondary transition-colors duration-200'>
            {title}
          </h3>
          <span className='font-mono text-sm text-muted shrink-0'>
            {company}
          </span>
        </div>

        {/* Short description */}
        <p className='text-secondary leading-relaxed mb-4'>{description}</p>

        {/* Tags */}
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <span
              key={tag}
              className='font-mono text-xs px-2 py-1 bg-surface text-muted'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand indicator */}
        <div className='flex items-center justify-between mt-4 pt-4 border-t border-border/50'>
          <span className='font-mono text-xs text-muted'>{role}</span>
          <span className='font-mono text-xs text-muted group-hover:text-secondary transition-colors duration-200'>
            {isExpanded ? 'Less ↑' : 'More ↓'}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='px-6 md:px-8 pb-6 md:pb-8 border-t border-border/50 pt-6'>
          <h4 className='font-mono text-sm font-bold text-primary mb-4'>
            Key Contributions
          </h4>
          <ul className='space-y-3'>
            {highlights.map((highlight, index) => (
              <li key={index} className='flex gap-3 text-sm text-secondary'>
                <span className='text-accent mt-1 shrink-0'>•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
