import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'ghost'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

/**
 * Brutalist button. Square corners. Solid uses accent bg, ghost uses
 * border-only. Disabled state respects pointer-events.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = 'solid', loading, disabled, children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={props.type ?? 'button'}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 px-4 py-2',
          'font-mono text-sm font-medium',
          'border transition-colors duration-150',
          'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'solid' &&
            'bg-accent text-accent-foreground border-accent hover:bg-accent-hover hover:border-accent-hover',
          variant === 'ghost' &&
            'bg-transparent text-primary border-border hover:border-muted',
          className,
        )}
        {...props}
      >
        {loading ? <Spinner /> : null}
        {children}
      </button>
    )
  },
)

function Spinner() {
  return (
    <svg
      className='size-4 animate-spin'
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeDasharray='40 60'
      />
    </svg>
  )
}
