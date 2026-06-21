import { z } from "zod"
import type { Question } from "./question"
import { templateSchemaSchema, type TemplateSchema } from "./template"

// Raw answer values stored in responses.answers
// shape: { [questionId]: value }
//
// We DON'T pre-define the shape statically because each brief has different
// questions. Instead, we BUILD a Zod schema at runtime from the snapshot.

export const answersRecordSchema = z.record(z.string(), z.unknown())
export type AnswersRecord = z.infer<typeof answersRecordSchema>

/** Validation messages used by the dynamic Zod builder. */
export type ValidationMessages = {
  required: string
  invalidUrl: string
  invalidEmail: string
  selectAtLeastOne: string
  addAtLeastOneLink: string
}

const DEFAULT_MESSAGES: ValidationMessages = {
  required: "Required field",
  invalidUrl: "Invalid URL",
  invalidEmail: "Invalid email",
  selectAtLeastOne: "Select at least one",
  addAtLeastOneLink: "Add at least one link",
}

/**
 * Build a Zod schema that validates a response based on the given template
 * snapshot. Used both server-side (submit) and client-side (react-hook-form).
 *
 * Pass `messages` to localize the validation copy. When omitted, English.
 */
export function buildResponseSchemaFromTemplate(
  template: TemplateSchema,
  messages: ValidationMessages = DEFAULT_MESSAGES,
): z.ZodType<AnswersRecord> {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const section of template.sections) {
    for (const q of section.questions) {
      if (q.type === "heading") continue
      shape[q.id] = buildQuestionSchema(q, messages)
    }
  }

  return z.object(shape) as unknown as z.ZodType<AnswersRecord>
}

function buildQuestionSchema(
  q: Exclude<Question, { type: "heading" }>,
  m: ValidationMessages,
): z.ZodTypeAny {
  let base: z.ZodTypeAny

  switch (q.type) {
    case "short_text":
    case "long_text": {
      let s = z.string()
      if (q.max_length) s = s.max(q.max_length)
      base = q.required ? s.min(1, m.required) : s.optional().or(z.literal(""))
      break
    }
    case "url": {
      const s = z.string().url(m.invalidUrl)
      base = q.required ? s : s.optional().or(z.literal(""))
      break
    }
    case "email": {
      const s = z.string().email(m.invalidEmail)
      base = q.required ? s : s.optional().or(z.literal(""))
      break
    }
    case "select":
    case "radio": {
      const allowed = q.options.map((o) => o.value) as [string, ...string[]]
      const s = z.enum(allowed)
      base = q.required ? s : s.optional()
      break
    }
    case "multi_select":
    case "checkbox_group": {
      const allowed = q.options.map((o) => o.value) as [string, ...string[]]
      const s = z.array(z.enum(allowed))
      base = q.required
        ? s.min(1, m.selectAtLeastOne)
        : s.optional().default([])
      break
    }
    case "file_links": {
      const s = z.array(z.string().url(m.invalidUrl))
      base = q.required
        ? s.min(1, m.addAtLeastOneLink)
        : s.optional().default([])
      break
    }
  }

  return base
}

// Re-export shared types for convenience
export { templateSchemaSchema }
export type { TemplateSchema }
