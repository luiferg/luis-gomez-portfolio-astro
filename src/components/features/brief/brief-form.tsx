import { useMemo, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import type { TemplateSchema } from "@/lib/brief-schemas/template"
import { buildResponseSchemaFromTemplate } from "@/lib/brief-schemas/response"
import type { Locale } from "@/lib/brief-schemas/locale"
import { getDict } from "@/lib/i18n"
import { QuestionField } from "./question-field"
import { RelockOverlay } from "./relock-overlay"

type Props = {
  publicId: string
  clientName: string
  schema: TemplateSchema
  locale: Locale
}

type SubmitOutcome =
  | { kind: "success" }
  | { kind: "locked" }
  | { kind: "error"; message: string }

export function BriefForm({ publicId, clientName, schema, locale }: Props) {
  const t = getDict(locale)

  const responseSchema = useMemo(
    () => buildResponseSchemaFromTemplate(schema, t.validation),
    [schema, t],
  )

  const methods = useForm({
    resolver: standardSchemaResolver(responseSchema),
    mode: "onBlur",
  })

  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [needsRelock, setNeedsRelock] = useState(false)
  const [pendingAnswers, setPendingAnswers] = useState<Record<
    string,
    unknown
  > | null>(null)

  async function postSubmit(
    answers: Record<string, unknown>,
  ): Promise<SubmitOutcome> {
    try {
      const res = await fetch("/api/brief/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ public_id: publicId, answers }),
      })
      if (res.status === 401) return { kind: "locked" }
      const data = (await res.json()) as {
        ok: boolean
        error?: string
        issues?: { path: string; message: string }[]
      }
      if (!data.ok) {
        const message = data.issues?.length
          ? data.issues.map((i) => `${i.path}: ${i.message}`).join(" \u00b7 ")
          : (data.error ?? t.gate.networkError)
        return { kind: "error", message }
      }
      return { kind: "success" }
    } catch {
      return { kind: "error", message: t.gate.networkError }
    }
  }

  async function attemptSubmit(answers: Record<string, unknown>) {
    setIsSubmitting(true)
    setSubmitError(null)
    const outcome = await postSubmit(answers)
    setIsSubmitting(false)

    if (outcome.kind === "success") {
      window.location.href = `/brief/${publicId}/thanks`
      return
    }
    if (outcome.kind === "locked") {
      setPendingAnswers(answers)
      setNeedsRelock(true)
      return
    }
    setSubmitError(outcome.message)
  }

  function onFormSubmit(values: unknown) {
    return attemptSubmit(values as Record<string, unknown>)
  }

  async function onRelockUnlocked() {
    setNeedsRelock(false)
    if (pendingAnswers) {
      const answers = pendingAnswers
      setPendingAnswers(null)
      await attemptSubmit(answers)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onFormSubmit)}
        className="container py-12 md:py-16"
      >
        <header className="max-w-2xl mb-12 flex flex-col gap-2">
          <p className="font-mono text-xs uppercase text-muted">
            {t.form.eyebrow}
          </p>
          <h1 className="font-mono text-2xl md:text-3xl font-bold text-primary">
            {clientName}
          </h1>
          <p className="font-mono text-sm text-secondary">{schema.name}</p>
          {schema.description ? (
            <p className="font-mono text-sm text-muted mt-2 max-w-prose">
              {schema.description}
            </p>
          ) : null}
        </header>

        <div className="max-w-2xl flex flex-col gap-12">
          {schema.sections.map((section) => (
            <section key={section.id} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-border pb-3">
                <h2 className="font-mono text-xl font-bold text-primary">
                  {section.title}
                </h2>
                {section.intro ? (
                  <p className="font-mono text-sm text-muted whitespace-pre-wrap">
                    {section.intro}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-6">
                {section.questions.map((q) => (
                  <QuestionField key={q.id} question={q} locale={locale} />
                ))}
              </div>
            </section>
          ))}

          <footer className="flex flex-col gap-3 border-t border-border pt-6">
            <FieldError>{submitError}</FieldError>
            <div className="flex justify-end">
              <Button type="submit" loading={isSubmitting}>
                {t.form.submit}
              </Button>
            </div>
          </footer>
        </div>
      </form>

      {needsRelock ? (
        <RelockOverlay
          publicId={publicId}
          onUnlocked={onRelockUnlocked}
          locale={locale}
        />
      ) : null}
    </FormProvider>
  )
}
