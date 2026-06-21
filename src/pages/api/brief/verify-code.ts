import type { APIRoute } from "astro"
import { z } from "zod"
import { verifyBriefCode } from "@/lib/brief/queries"
import { buildUnlockCookieValue } from "@/lib/brief/unlock-cookie"

export const prerender = false

const bodySchema = z.object({
  public_id: z.string().min(8).max(64),
  access_code: z.string().regex(/^[0-9]{6}$/),
})

export const POST: APIRoute = async ({ request, cookies }) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: "Invalid request body" }, 400)
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: "Invalid input" }, 400)
  }

  const brief = await verifyBriefCode(parsed.data.public_id, parsed.data.access_code)
  if (!brief) {
    // Same response shape on not-found and wrong-code to avoid leaking.
    return json({ ok: false, error: "Invalid code" }, 401)
  }

  const cookie = buildUnlockCookieValue(parsed.data.public_id)
  cookies.set(cookie.name, cookie.value, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    // Must cover both the brief page (/brief/<id>) and the submit endpoint
    // (/api/brief/submit). The cookie name is already scoped per-brief
    // (brief_unlock_<id>), so a wider path doesn't widen the auth scope.
    path: "/",
    maxAge: cookie.maxAge,
  })

  return json({ ok: true })
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  })
}

