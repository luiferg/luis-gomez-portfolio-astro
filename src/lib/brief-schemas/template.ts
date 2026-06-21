import { z } from "zod"
import { questionSchema } from "./question"

export const sectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, "title is required"),
  intro: z.string().optional(), // TipTap HTML
  questions: z.array(questionSchema),
})

export type Section = z.infer<typeof sectionSchema>

// The schema stored in templates.schema and copied to briefs.schema_snapshot
export const templateSchemaSchema = z.object({
  version: z.literal(1),
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  sections: z.array(sectionSchema),
})

export type TemplateSchema = z.infer<typeof templateSchemaSchema>

// Row shape from the database
export const templateRowSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  schema: templateSchemaSchema,
  is_published: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type TemplateRow = z.infer<typeof templateRowSchema>
