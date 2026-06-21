import { z } from "zod"

// ----------------------------------------------------------------------------
// Option for select / radio / checkbox groups
// ----------------------------------------------------------------------------
export const optionSchema = z.object({
  value: z.string().min(1, "value is required"),
  label: z.string().min(1, "label is required"),
})
export type Option = z.infer<typeof optionSchema>

// ----------------------------------------------------------------------------
// Base fields shared by all input-type questions
// ----------------------------------------------------------------------------
const baseInputFields = {
  id: z.string().min(1),
  label: z.string().min(1, "label is required"),
  helper: z.string().optional(),
  required: z.boolean().default(false),
}

// ----------------------------------------------------------------------------
// Discriminated union — one source of truth for backoffice, AI, and renderer
// ----------------------------------------------------------------------------
export const shortTextSchema = z.object({
  ...baseInputFields,
  type: z.literal("short_text"),
  placeholder: z.string().optional(),
  max_length: z.number().int().positive().optional(),
})

export const longTextSchema = z.object({
  ...baseInputFields,
  type: z.literal("long_text"),
  placeholder: z.string().optional(),
  max_length: z.number().int().positive().optional(),
})

export const urlQuestionSchema = z.object({
  ...baseInputFields,
  type: z.literal("url"),
  placeholder: z.string().optional(),
})

export const emailQuestionSchema = z.object({
  ...baseInputFields,
  type: z.literal("email"),
  placeholder: z.string().optional(),
})

export const selectSchema = z.object({
  ...baseInputFields,
  type: z.literal("select"),
  options: z.array(optionSchema).min(2),
})

export const multiSelectSchema = z.object({
  ...baseInputFields,
  type: z.literal("multi_select"),
  options: z.array(optionSchema).min(2),
})

export const radioSchema = z.object({
  ...baseInputFields,
  type: z.literal("radio"),
  options: z.array(optionSchema).min(2),
})

export const checkboxGroupSchema = z.object({
  ...baseInputFields,
  type: z.literal("checkbox_group"),
  options: z.array(optionSchema).min(1),
})

export const fileLinksSchema = z.object({
  ...baseInputFields,
  type: z.literal("file_links"),
  placeholder: z.string().optional(),
})

// Heading is a visual separator, NOT an input
export const headingSchema = z.object({
  id: z.string().min(1),
  type: z.literal("heading"),
  content: z.string().min(1, "content is required"),
})

// ----------------------------------------------------------------------------
// Question union
// ----------------------------------------------------------------------------
export const questionSchema = z.discriminatedUnion("type", [
  shortTextSchema,
  longTextSchema,
  urlQuestionSchema,
  emailQuestionSchema,
  selectSchema,
  multiSelectSchema,
  radioSchema,
  checkboxGroupSchema,
  fileLinksSchema,
  headingSchema,
])

export type Question = z.infer<typeof questionSchema>
export type QuestionType = Question["type"]

// Helper to know which types are actual inputs (vs heading)
export const INPUT_QUESTION_TYPES = [
  "short_text",
  "long_text",
  "url",
  "email",
  "select",
  "multi_select",
  "radio",
  "checkbox_group",
  "file_links",
] as const satisfies readonly QuestionType[]

export type InputQuestionType = (typeof INPUT_QUESTION_TYPES)[number]

export function isInputQuestion(
  q: Question,
): q is Exclude<Question, { type: "heading" }> {
  return q.type !== "heading"
}
