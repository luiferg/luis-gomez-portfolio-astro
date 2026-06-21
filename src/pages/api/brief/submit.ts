import type { APIRoute } from "astro"
import { z } from "zod"
import {
  getBriefByPublicId,
  submitBriefResponse,
} from "@/lib/brief/queries"
import {
  cookieNameForBrief,
  verifyUnlockCookie,
} from "@/lib/brief/unlock-cookie"
import { buildResponseSchemaFromTemplate } from "@/lib/brief-schemas/response"
import { sendResponseEmails } from "@/lib/email/send-response-emails"
import { getDict } from "@/lib/i18n"

export const prerender = false

const bodySchema = z.object({
  public_id: z.string().min(8).max(64),
  answers: z.record(z.string(), z.unknown()),
})

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: "Invalid body" }, 400)
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: "Invalid input" }, 400)
  }

  const publicId = parsed.data.public_id

  // Gate: must have a valid unlock cookie for this brief.
  const cookieValue = cookies.get(cookieNameForBrief(publicId))?.value
  if (!verifyUnlockCookie(publicId, cookieValue)) {
    return json({ ok: false, error: "Locked. Re-enter the access code." }, 401)
  }

  const brief = await getBriefByPublicId(publicId)
  if (!brief) {
    return json({ ok: false, error: "Brief not found" }, 404)
  }

  // Dynamic validation from the snapshot, with messages in the client's
  // language so they read naturally if surfaced in the form.
  const t = getDict(brief.language)
  const responseSchema = buildResponseSchemaFromTemplate(
    brief.schema_snapshot,
    t.validation,
  )
  const validated = responseSchema.safeParse(parsed.data.answers)
  if (!validated.success) {
    return json(
      {
        ok: false,
        error: "Some answers are invalid",
        issues: validated.error.issues.slice(0, 5).map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      400,
    )
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    clientAddress ??
    null
  const ua = request.headers.get("user-agent") ?? null

  const result = await submitBriefResponse({
    briefId: brief.id,
    answers: validated.data,
    ip,
    userAgent: ua,
  })

  if (!result.ok) {
    return json({ ok: false, error: result.error }, 500)
  }

  // Fire-and-forget notifications. Awaited so the serverless function doesn't
  // exit before they complete, but errors are swallowed inside.
  await sendResponseEmails({
    briefId: brief.id,
    clientName: brief.client_name,
    clientEmail: brief.client_email,
    templateName: brief.schema_snapshot.name,
    locale: brief.language,
  })

  return json({ ok: true })
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  })
}
