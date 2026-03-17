/**
 * Pixel Background Component
 * Canvas-based living pixel effect
 * Performance-optimized with requestAnimationFrame
 *
 * Supports two modes:
 * - 'framed': contained within a bordered box
 * - 'full-bleed': full viewport, fades out on scroll
 */

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback, useState } from "react";

interface PixelBackgroundProps {
  mode?: "framed" | "full-bleed";
  density?: number;
  speed?: number;
  className?: string;
}

interface Pixel {
  x: number;
  y: number;
  brightness: number;
  targetBrightness: number;
  size: number;
}

// Purple tint color values from PRD
const PIXEL_R = 40;
const PIXEL_G = 15;
const PIXEL_B = 80;

export function PixelBackground({
  mode = "framed",
  density = 28,
  speed = 1,
  className = "",
}: PixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const isReducedMotion = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const createPixels = useCallback(
    (width: number, height: number) => {
      const pixels: Pixel[] = [];
      // Smaller pixel size = more texture (PRD: ~20-25px)
      const size = Math.max(4, Math.floor(600 / density));

      for (let x = 0; x < width; x += size) {
        for (let y = 0; y < height; y += size) {
          // Subtler brightness variation: 0.03-0.12 (from PRD)
          const brightness = Math.random() * 0.09 + 0.03;
          pixels.push({
            x,
            y,
            brightness,
            targetBrightness: brightness,
            size,
          });
        }
      }

      return pixels;
    },
    [density],
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear with background color
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);

    // Calculate opacity based on mode and scroll
    let opacity = 1;
    if (mode === "full-bleed") {
      // Fade from 1 to 0 over first 100vh of scroll
      opacity = Math.max(0, 1 - scrollProgress);
    }

    // Draw pixels with purple tint
    pixelsRef.current.forEach((pixel) => {
      // Smooth brightness transition
      if (!isReducedMotion.current) {
        pixel.brightness +=
          (pixel.targetBrightness - pixel.brightness) * 0.02 * speed;

        // Randomly change target brightness (slower for subtler effect)
        if (Math.random() < 0.003 * speed) {
          // Subtler brightness range: 0.03-0.12
          pixel.targetBrightness = Math.random() * 0.09 + 0.03;
        }
      }

      // Apply mode-based opacity
      const finalOpacity = pixel.brightness * opacity;

      // Purple tint (R:40, G:15, B:80 from PRD)
      const r = Math.floor(finalOpacity * PIXEL_R);
      const g = Math.floor(finalOpacity * PIXEL_G);
      const b = Math.floor(finalOpacity * PIXEL_B);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
      // -1 for slight gap between pixels
      ctx.fillRect(pixel.x, pixel.y, pixel.size - 1, pixel.size - 1);
    });

    // Continue animation
    if (!isReducedMotion.current) {
      animationRef.current = requestAnimationFrame(draw);
    }
  }, [speed, mode, scrollProgress]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width: number;
    let height: number;

    if (mode === "framed" && container) {
      // For framed mode, use container dimensions
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    } else {
      // For full-bleed, use viewport
      width = window.innerWidth;
      height = window.innerHeight;
    }

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    pixelsRef.current = createPixels(width, height);
  }, [mode, createPixels]);

  const handleScroll = useCallback(() => {
    if (mode === "full-bleed") {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = scrollY / viewportHeight;
      setScrollProgress(Math.min(progress, 1));
    }
  }, [mode]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
      if (e.matches) {
        cancelAnimationFrame(animationRef.current);
      } else {
        draw();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Initial setup
    const canvas = canvasRef.current;
    if (canvas) {
      handleResize();
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);

      if (!isReducedMotion.current) {
        draw();
      }
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [draw, handleResize, handleScroll]);

  const containerClasses =
    mode === "framed"
      ? "flex-1 overflow-hidden border-none absolute left-0 top-0 w-full h-full"
      : "";

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={
        mode === "framed" ? { height: "100%", minHeight: "400px" } : undefined
      }
    >
      <canvas
        ref={canvasRef}
        className={cn(
          mode === "full-bleed" ? "fixed inset-0 -z-1" : "absolute inset-0 z-1",
          "pointer-events-none",
          className,
        )}
        aria-hidden="true"
      />
    </div>
  );
}
