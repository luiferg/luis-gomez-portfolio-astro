import { useState, useTransition } from "react"
import { OTPInput } from "@/components/ui/otp-input"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import type { Locale } from "@/lib/brief-schemas/locale"
import { getDict } from "@/lib/i18n"

type Props = {
  publicId: string
  /** Called with the verified code so the caller can retry whatever failed. */
  onUnlocked: () => void
  locale: Locale
}

/**
 * Inline gate shown when the submit endpoint returns 401 (cookie expired
 * or cleared). The form values remain in memory; the user only re-enters
 * the access code, and the caller retries the submission.
 */
export function RelockOverlay({ publicId, onUnlocked, locale }: Props) {
  const t = getDict(locale)
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function submit(value: string) {
    if (value.length !== 6) return
    startTransition(async () => {
      setError(null)
      try {
        const res = await fetch("/api/brief/verify-code", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ public_id: publicId, access_code: value }),
        })
        const data = (await res.json()) as { ok: boolean; error?: string }
        if (!data.ok) {
          setError(t.gate.invalidCode)
          setCode("")
          return
        }
        onUnlocked()
      } catch {
        setError(t.gate.networkError)
      }
    })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="relock-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-md flex flex-col gap-4 border border-border bg-surface p-6">
        <div className="flex flex-col gap-1">
          <h2
            id="relock-title"
            className="font-mono text-lg font-bold text-primary"
          >
            {t.relock.title}
          </h2>
          <p className="font-mono text-xs text-muted">{t.relock.body}</p>
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
        />

        <FieldError>{error}</FieldError>

        <Button
          onClick={() => submit(code)}
          disabled={code.length !== 6}
          loading={isPending}
        >
          {t.relock.cta}
        </Button>
      </div>
    </div>
  )
}
