import { getSupabaseAdmin } from "./supabase"
import { templateSchemaSchema, type TemplateSchema } from "@/lib/brief-schemas/template"
import { DEFAULT_LOCALE, localeSchema, type Locale } from "@/lib/brief-schemas/locale"

export type PublicBrief = {
  id: string
  public_id: string
  status: "draft" | "sent" | "submitted" | "archived"
  schema_snapshot: TemplateSchema
  client_name: string
  client_email: string | null
  language: Locale
}

function parseLocale(v: unknown): Locale {
  return localeSchema.catch(DEFAULT_LOCALE).parse(v)
}

/**
 * Look up a brief by its public_id. Server-only. Returns null if not found
 * or if the brief is archived (clients should not see archived briefs).
 */
export async function getBriefByPublicId(
  publicId: string,
): Promise<PublicBrief | null> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("briefs")
    .select(
      "id, public_id, status, schema_snapshot, language, clients(name, contact_email)",
    )
    .eq("public_id", publicId)
    .maybeSingle()

  if (error || !data) return null
  if (data.status === "archived") return null

  const snapshot = templateSchemaSchema.safeParse(data.schema_snapshot)
  if (!snapshot.success) return null

  const client = (
    data as unknown as { clients: { name: string; contact_email: string | null } }
  ).clients
  return {
    id: data.id,
    public_id: data.public_id,
    status: data.status,
    schema_snapshot: snapshot.data,
    client_name: client?.name ?? "",
    client_email: client?.contact_email ?? null,
    language: parseLocale(data.language),
  }
}

/**
 * Verify a (public_id, access_code) pair. Constant-ish lookup (single
 * indexed query). Returns the brief on success, null on failure.
 */
export async function verifyBriefCode(
  publicId: string,
  accessCode: string,
): Promise<PublicBrief | null> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("briefs")
    .select(
      "id, public_id, status, access_code, schema_snapshot, language, clients(name, contact_email)",
    )
    .eq("public_id", publicId)
    .maybeSingle()

  if (error || !data) return null
  if (data.status === "archived") return null
  if (data.access_code !== accessCode) return null

  const snapshot = templateSchemaSchema.safeParse(data.schema_snapshot)
  if (!snapshot.success) return null

  const client = (
    data as unknown as { clients: { name: string; contact_email: string | null } }
  ).clients
  return {
    id: data.id,
    public_id: data.public_id,
    status: data.status,
    schema_snapshot: snapshot.data,
    client_name: client?.name ?? "",
    client_email: client?.contact_email ?? null,
    language: parseLocale(data.language),
  }
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string }

/** Persist a response. Marks the brief as `submitted` if it was `sent`. */
export async function submitBriefResponse(args: {
  briefId: string
  answers: Record<string, unknown>
  ip: string | null
  userAgent: string | null
}): Promise<SubmitResult> {
  const supabase = getSupabaseAdmin()

  const { error: insertError } = await supabase.from("responses").insert({
    brief_id: args.briefId,
    answers: args.answers,
    ip_address: args.ip,
    user_agent: args.userAgent,
  })

  if (insertError) {
    return { ok: false, error: insertError.message }
  }

  // Best-effort status transition. Don't fail the submission if this fails.
  await supabase
    .from("briefs")
    .update({ status: "submitted" })
    .eq("id", args.briefId)
    .in("status", ["draft", "sent"])

  return { ok: true }
}
