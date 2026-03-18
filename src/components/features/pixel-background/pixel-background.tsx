/**
 * Pixel Background Component
 * Canvas-based living pixel effect
 * Performance-optimized with requestAnimationFrame
 *
 * Supports modes:
 * - 'guided': Pixels between edge guides, gradient fade at bottom (recommended)
 * - 'none': No pixel background
 */

import { cn } from '@/lib/utils'
import { useEffect, useRef, useCallback, useState } from 'react'

interface PixelBackgroundProps {
  mode?: 'guided' | 'none'
  density?: number
  speed?: number
  height?: number
  className?: string
}

interface Pixel {
  x: number
  y: number
  brightness: number
  targetBrightness: number
  size: number
}

// Purple tint color values from PRD
const PIXEL_R = 5
const PIXEL_G = 5
const PIXEL_B = 5

export function PixelBackground({
  mode = 'guided',
  density = 28,
  speed = 1,
  height = 650,
  className = '',
}: PixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const animationRef = useRef<number>(0)
  const isReducedMotion = useRef(false)

  // Match edge-guide spacing from global.css
  const EDGE_GUIDE_OFFSET = '3rem' // var(--spacing-container-desktop)

  const createPixels = useCallback(
    (width: number, height: number) => {
      const pixels: Pixel[] = []
      // Smaller pixel size = more texture (PRD: ~20-25px)
      const size = Math.max(4, Math.floor(600 / density))

      for (let x = 0; x < width; x += size) {
        for (let y = 0; y < height; y += size) {
          // Brightness range: 0.15-0.4 for better visibility on dark bg
          const brightness = Math.random() * 0.25 + 0.15
          pixels.push({
            x,
            y,
            brightness,
            targetBrightness: brightness,
            size,
          })
        }
      }

      return pixels
    },
    [density],
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const canvasHeight = canvas.height

    // Clear with background color
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, width, canvasHeight)

    // Draw pixels with purple tint
    pixelsRef.current.forEach((pixel) => {
      // Smooth brightness transition
      if (!isReducedMotion.current) {
        pixel.brightness +=
          (pixel.targetBrightness - pixel.brightness) * 0.02 * speed

        // Randomly change target brightness (slower for subtler effect)
        if (Math.random() < 0.003 * speed) {
          // Brightness range: 0.15-0.4 for visibility
          pixel.targetBrightness = Math.random() * 0.25 + 0.15
        }
      }

      // Apply pixel brightness
      const finalOpacity = pixel.brightness

      // Purple tint (R:40, G:15, B:80 from PRD)
      const r = Math.floor(finalOpacity * PIXEL_R)
      const g = Math.floor(finalOpacity * PIXEL_G)
      const b = Math.floor(finalOpacity * PIXEL_B)

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`
      // -1 for slight gap between pixels
      ctx.fillRect(pixel.x, pixel.y, pixel.size - 1, pixel.size - 1)
    })

    // Continue animation
    if (!isReducedMotion.current) {
      animationRef.current = requestAnimationFrame(draw)
    }
  }, [speed])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Use provided height prop or container height
    let width: number
    let canvasHeight: number

    if (container) {
      const rect = container.getBoundingClientRect()
      width = rect.width
      canvasHeight = height
    } else {
      width = window.innerWidth
      canvasHeight = height
    }

    canvas.width = width * dpr
    canvas.height = canvasHeight * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${canvasHeight}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

    pixelsRef.current = createPixels(width, canvasHeight)
  }, [height, createPixels])

  useEffect(() => {
    // Don't render if mode is 'none'
    if (mode === 'none') return

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    isReducedMotion.current = mediaQuery.matches

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches
      if (e.matches) {
        cancelAnimationFrame(animationRef.current)
      } else {
        draw()
      }
    }

    mediaQuery.addEventListener('change', handleMotionChange)

    // Initial setup
    const canvas = canvasRef.current
    if (canvas) {
      handleResize()
      window.addEventListener('resize', handleResize)

      if (!isReducedMotion.current) {
        draw()
      }
    }

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [draw, handleResize, mode])

  // Don't render anything if mode is 'none'
  if (mode === 'none') {
    return null
  }

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 overflow-hidden'
      style={{ height: `${height}px` }}
    >
      <canvas
        ref={canvasRef}
        className={cn('absolute inset-0 pointer-events-none', className)}
        style={{
          // Gradient fade at bottom - pixels visible at top, fade to hidden at bottom
          // In mask-image: opaque = visible, transparent = hidden
          maskImage: `linear-gradient(to bottom, 
            rgba(0, 0, 0, 1) 0%, 
            rgba(0, 0, 0, 1) 50%, 
            rgba(0, 0, 0, 0.4) 75%, 
            transparent 100%
          )`,
          WebkitMaskImage: `linear-gradient(to bottom, 
            rgba(0, 0, 0, 1) 0%, 
            rgba(0, 0, 0, 1) 50%, 
            rgba(0, 0, 0, 0.4) 75%, 
            transparent 100%
          )`,
        }}
        aria-hidden='true'
      />
    </div>
  )
}
