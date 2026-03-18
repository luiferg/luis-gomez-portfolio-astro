/**
 * Scroll Reveal Component
 * Animates elements when they enter the viewport
 * Following Emil's approach: subtle, fast, purposeful
 */

import { useRef } from 'react'
import { motion, useInView, type HTMLMotionProps } from 'motion/react'

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
    none: { y: 0, x: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.3,
        delay,
        ease: 'easeOut',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
