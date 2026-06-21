import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * Brutalist input. Square corners, surface bg, border-border default,
 * focus-visible accent. Monospace.
 */
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-surface border border-border px-3 py-2",
          "font-mono text-base text-primary placeholder:text-muted",
          "transition-colors duration-150",
          "hover:border-muted",
          "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:border-accent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "aria-[invalid=true]:border-red-500/60",
          className,
        )}
        {...props}
      />
    )
  },
)

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full bg-surface border border-border px-3 py-2",
        "font-mono text-base text-primary placeholder:text-muted",
        "transition-colors duration-150",
        "hover:border-muted",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:border-accent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-[invalid=true]:border-red-500/60",
        "resize-y min-h-24",
        className,
      )}
      {...props}
    />
  )
})

export function Label({
  htmlFor,
  required,
  className,
  children,
}: {
  htmlFor?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "font-mono text-sm text-primary inline-flex items-center gap-1",
        className,
      )}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="text-accent">
          *
        </span>
      ) : null}
    </label>
  )
}

export function FieldHelper({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs text-muted">{children}</p>
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null
  return (
    <p role="alert" className="font-mono text-xs text-red-400">
      {children}
    </p>
  )
}

/** Vertical stack: label, control, helper, error. */
export function Field({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>{children}</div>
  )
}
