import { useState, useTransition } from 'react'
import { OTPInput } from '@/components/ui/otp-input'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import type { Locale } from '@/lib/brief-schemas/locale'
import { getDict } from '@/lib/i18n'

type Props = {
  publicId: string
  clientName: string
  templateName: string
  locale: Locale
}

export function AccessCodeGate({
  publicId,
  clientName,
  templateName,
  locale,
}: Props) {
  const t = getDict(locale)
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function submit(value: string) {
    if (value.length !== 6) return
    startTransition(async () => {
      setError(null)
      try {
        const res = await fetch('/api/brief/verify-code', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ public_id: publicId, access_code: value }),
        })
        const data = (await res.json()) as { ok: boolean; error?: string }
        if (!data.ok) {
          setError(t.gate.invalidCode)
          setCode('')
          return
        }
        // Reload to land on the form (server-rendered with the unlock cookie).
        window.location.reload()
      } catch {
        setError(t.gate.networkError)
      }
    })
  }

  return (
    <div className='container py-16 md:py-24'>
      <div className='mx-auto max-w-md flex flex-col gap-8'>
        <header className='flex flex-col gap-2'>
          <p className='font-mono text-xs uppercase text-muted'>
            {t.gate.eyebrow}
          </p>
          <h1 className='font-mono text-2xl md:text-3xl font-bold text-primary'>
            {clientName}
          </h1>
          <p className='font-mono text-sm text-secondary'>{templateName}</p>
        </header>

        <div className='flex flex-col gap-4 border border-border bg-surface p-6'>
          <div className='flex flex-col gap-1'>
            <p className='font-mono text-sm text-primary'>
              {t.gate.enterCode}
            </p>
            <p className='font-mono text-xs text-muted'>{t.gate.codeHelp}</p>
          </div>

          <OTPInput
            value={code}
            onChange={(v) => {
              setCode(v)
              if (error) setError(null)
            }}
            onComplete={submit}
            disabled={isPending}
            ariaInvalid={Boolean(error)}
            className='mx-auto'
          />

          <FieldError>{error}</FieldError>

          <Button
            onClick={() => submit(code)}
            disabled={code.length !== 6}
            loading={isPending}
          >
            {t.gate.unlock}
          </Button>
        </div>

        <p className='font-mono text-xs text-muted'>
          {t.gate.wrongLink}{' '}
          <a href='/' className='underline hover:text-secondary'>
            {t.gate.backHome}
          </a>
        </p>
      </div>
    </div>
  )
}
