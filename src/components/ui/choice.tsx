import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * Radio / Checkbox option styled as a brutalist row:
 * - Square box on the left, label to the right.
 * - Selected state filled with accent.
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
  return (
    <label
      className={cn(
        "flex items-center gap-3 p-2 border border-transparent cursor-pointer",
        "hover:bg-surface transition-colors",
        "has-[input:checked]:border-accent has-[input:checked]:bg-surface",
        "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-accent has-[input:focus-visible]:outline-offset-2",
        "has-[input:disabled]:opacity-50 has-[input:disabled]:cursor-not-allowed",
        className,
      )}
    >
      <input ref={ref} type={type} className="peer sr-only" {...props} />
      <span
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0 border border-border bg-surface",
          "peer-checked:bg-accent peer-checked:border-accent",
          "transition-colors",
          type === "radio" && "rounded-full",
        )}
      />
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
          <span aria-hidden="true" className="text-accent">
            *
          </span>
        ) : null}
      </legend>
      <div className="flex flex-col gap-1">{children}</div>
    </fieldset>
  )
}
