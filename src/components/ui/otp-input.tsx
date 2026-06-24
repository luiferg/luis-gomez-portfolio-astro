import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  length?: number
  value: string
  onChange: (next: string) => void
  onComplete?: (full: string) => void
  disabled?: boolean
  ariaInvalid?: boolean
  ariaLabel?: string
  className?: string
}

/**
 * Six-digit OTP input. Brutalist boxes, monospace.
 * - Paste a whole string and it splits into boxes.
 * - Backspace moves focus to previous box.
 * - Only digits accepted.
 */
export function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled,
  ariaInvalid,
  ariaLabel = 'Access code',
  className,
}: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const [internal, setInternal] = useState(value)

  useEffect(() => {
    setInternal(value)
  }, [value])

  function setAt(idx: number, digit: string) {
    const chars = internal.padEnd(length, ' ').split('')
    chars[idx] = digit || ' '
    const next = chars.join('').replace(/\s/g, '')
    setInternal(next.slice(0, length))
    onChange(next.slice(0, length))
    if (next.length === length) {
      onComplete?.(next.slice(0, length))
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const chars = internal.split('')
      if (chars[idx]) {
        chars[idx] = ''
      } else if (idx > 0) {
        chars[idx - 1] = ''
        refs.current[idx - 1]?.focus()
      }
      const next = chars.join('')
      setInternal(next)
      onChange(next)
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault()
      refs.current[idx - 1]?.focus()
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      e.preventDefault()
      refs.current[idx + 1]?.focus()
    }
  }

  function onInput(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const digits = e.target.value.replace(/\D/g, '')
    if (!digits) {
      setAt(idx, '')
      return
    }
    if (digits.length === 1) {
      setAt(idx, digits)
      if (idx < length - 1) refs.current[idx + 1]?.focus()
    } else {
      // pasted multiple digits — distribute starting at idx
      const chars = internal.padEnd(length, ' ').split('')
      for (let i = 0; i < digits.length && idx + i < length; i++) {
        chars[idx + i] = digits[i]!
      }
      const next = chars.join('').replace(/\s/g, '').slice(0, length)
      setInternal(next)
      onChange(next)
      const focusIdx = Math.min(idx + digits.length, length - 1)
      refs.current[focusIdx]?.focus()
      if (next.length === length) onComplete?.(next)
    }
  }

  return (
    <div
      role='group'
      aria-label={ariaLabel}
      aria-invalid={ariaInvalid || undefined}
      className={cn('flex gap-2', className)}
    >
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            refs.current[idx] = el
          }}
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          maxLength={1}
          // Autofocus first box on mount so the user can type immediately.
          autoFocus={idx === 0}
          value={internal[idx] ?? ''}
          onChange={(e) => onInput(e, idx)}
          onKeyDown={(e) => onKeyDown(e, idx)}
          disabled={disabled}
          aria-invalid={ariaInvalid || undefined}
          aria-label={`Digit ${idx + 1}`}
          className={cn(
            'w-12 h-14 text-center bg-surface border border-border',
            'font-mono text-2xl text-primary',
            'transition-colors duration-150',
            'hover:border-muted',
            'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:border-accent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            ariaInvalid && 'border-red-500/60',
          )}
        />
      ))}
    </div>
  )
}
