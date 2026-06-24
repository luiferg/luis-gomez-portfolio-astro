import { forwardRef, type SelectHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * Native <select> styled brutalist. Native is accessible by default and
 * matches the lo-fi vibe of the site. No portal, no headless library.
 */
export const NativeSelect = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(function NativeSelect({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full bg-surface border border-border px-3 py-2",
        "font-mono text-base text-primary",
        "transition-colors duration-150",
        "hover:border-muted",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:border-accent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-[invalid=true]:border-red-500/60",
        // chevron via background image to avoid extra DOM
        "appearance-none bg-[length:12px] bg-no-repeat bg-[position:right_0.75rem_center] pr-9",
        "bg-[image:linear-gradient(45deg,transparent_50%,currentColor_50%),linear-gradient(135deg,currentColor_50%,transparent_50%)]",
        "bg-[size:5px_5px,5px_5px] bg-[position:calc(100%-15px)_55%,calc(100%-10px)_55%]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
})
