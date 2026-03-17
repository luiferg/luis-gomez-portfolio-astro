import { useState, useCallback } from 'react'
import { SITE_CONFIG } from '@/config/site'

interface CopyEmailProps {
  className?: string
}

export function CopyEmail({ className = '' }: CopyEmailProps) {
  const [copied, setCopied] = useState(false)
  const email = SITE_CONFIG.author.email

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = email
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [email])

  return (
    <button
      onClick={handleCopy}
      className={`group relative font-mono text-lg flex items-center gap-2 hover:text-secondary transition-colors ${className}`}
      aria-label={copied ? 'Email copied' : 'Copy email'}
    >
      <span>{email}</span>
      <span className='opacity-50 group-hover:opacity-100 transition-opacity'>
        {copied ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='20 6 9 17 4 12'></polyline>
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <rect width='14' height='14' x='8' y='8' rx='2' ry='2'></rect>
            <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'></path>
          </svg>
        )}
      </span>
      {copied && (
        <span className='absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-muted bg-surface px-2 py-1'>
          Copied!
        </span>
      )}
    </button>
  )
}
