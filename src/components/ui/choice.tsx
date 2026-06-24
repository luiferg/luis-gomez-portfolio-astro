import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * Radio / Checkbox option styled as a brutalist row:
 * - Square box (or circle) on the left, label to the right.
 * - Selected state filled with form-accent (brutalist white) + dark mark inside
 *   for redundant visual cue beyond pure color change.
 *
 * Render inside a fieldset with a legend for the group label.
 */
type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  type: "radio" | "checkbox"
  label: React.ReactNode
}

export const Choice = forwardRef<HTMLInputElement, ChoiceProps>(function Choice(
  { className, label, type, ...props },
  ref,
) {
  const isRadio = type === "radio"

  return (
    <label
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 border border-border/60 cursor-pointer",
        "hover:border-muted hover:bg-surface/60 transition-colors",
        // Selected state: brutalist white border + tinted surface so the row
        // itself reads as "chosen" at a glance.
        "has-[input:checked]:border-form-accent has-[input:checked]:bg-surface",
        "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-form-accent has-[input:focus-visible]:outline-offset-2",
        "has-[input:disabled]:opacity-50 has-[input:disabled]:cursor-not-allowed",
        className,
      )}
    >
      <input ref={ref} type={type} className="peer sr-only" {...props} />
      <span
        aria-hidden="true"
        className={cn(
          // Unselected: thick muted border, transparent inside.
          "relative size-4 shrink-0 border-2 border-muted bg-transparent flex items-center justify-center",
          // Selected: filled white.
          "peer-checked:bg-form-accent peer-checked:border-form-accent",
          "transition-colors",
          isRadio && "rounded-full",
        )}
      >
        {/* Inner mark — visible only when the parent label has a checked input.
            Uses group-has so the rule cascades from the <label> ancestor,
            independent of DOM hierarchy with the peer input. */}
        {isRadio ? (
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full bg-form-accent-contrast",
              "opacity-0 group-has-[input:checked]:opacity-100",
              "transition-opacity",
            )}
          />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={cn(
              "size-3 text-form-accent-contrast",
              "opacity-0 group-has-[input:checked]:opacity-100",
              "transition-opacity",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
          >
            <path d="M3 8.5 L7 12 L13 4" />
          </svg>
        )}
      </span>
      <span className="font-mono text-sm text-primary">{label}</span>
    </label>
  )
})

export function ChoiceGroup({
  legend,
  required,
  children,
  className,
}: {
  legend: React.ReactNode
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <fieldset className={cn("flex flex-col gap-1.5", className)}>
      <legend className="font-mono text-sm text-primary inline-flex items-center gap-1">
        {legend}
        {required ? (
          <span
            aria-hidden="true"
            className="text-red-400"
            title="Campo obligatorio"
          >
            *
          </span>
        ) : null}
      </legend>
      <div className="flex flex-col gap-1">{children}</div>
    </fieldset>
  )
}
