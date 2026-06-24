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
import { BriefSectionNav } from "./brief-section-nav"
import { BriefSectionJump } from "./brief-section-jump"

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

const SECTION_ID_PREFIX = "section-"

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

  const totalQuestions = schema.sections.reduce(
    (acc, s) => acc + s.questions.filter((q) => q.type !== "heading").length,
    0,
  )

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onFormSubmit)}
        className="container py-8 md:py-16"
      >
        {/* Header */}
        <header className="mb-8 md:mb-12 flex flex-col gap-2 max-w-3xl">
          <p className="font-mono text-xs uppercase text-muted">
            {t.form.eyebrow}
          </p>
          <h1 className="font-mono text-2xl md:text-3xl font-bold text-primary">
            {clientName}
          </h1>
          <p className="font-mono text-sm text-secondary">{schema.name}</p>
          {schema.description ? (
            <p className="font-mono text-sm text-muted mt-2 max-w-prose whitespace-pre-wrap">
              {schema.description}
            </p>
          ) : null}
          <p className="font-mono text-xs text-muted mt-2">
            {schema.sections.length} {schema.sections.length === 1 ? "secci\u00f3n" : "secciones"}
            {" \u00b7 "}
            {totalQuestions} {totalQuestions === 1 ? "pregunta" : "preguntas"}
          </p>
        </header>

        {/* Mobile section jumper — visible only below lg */}
        <div className="mb-8 lg:hidden">
          <BriefSectionJump
            sections={schema.sections}
            idPrefix={SECTION_ID_PREFIX}
            label={t.form.jumpToSection}
          />
        </div>

        {/* Sidebar + main */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Sidebar (sticky, desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <BriefSectionNav
                sections={schema.sections}
                idPrefix={SECTION_ID_PREFIX}
              />
            </div>
          </aside>

          {/* Main column */}
          <div className="min-w-0 max-w-2xl flex flex-col gap-12">
            {schema.sections.map((section, idx) => (
              <section
                key={section.id}
                id={SECTION_ID_PREFIX + section.id}
                className="flex flex-col gap-6 scroll-mt-8"
              >
                <div className="flex flex-col gap-1 border-b border-border pb-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {String(idx + 1).padStart(2, "0")} / {String(schema.sections.length).padStart(2, "0")}
                  </p>
                  <h2 className="font-mono text-xl font-bold text-primary">
                    {section.title}
                  </h2>
                  {section.intro ? (
                    <p className="font-mono text-sm text-muted whitespace-pre-wrap mt-1">
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

            {/* Submit footer */}
            <footer className="flex flex-col gap-3 border-t border-border pt-6">
              <FieldError>{submitError}</FieldError>
              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full sm:w-auto sm:self-end sm:px-8 py-3 text-base"
              >
                {t.form.submit}
              </Button>
            </footer>
          </div>
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
