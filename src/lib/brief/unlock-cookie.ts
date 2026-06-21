import { createHmac, timingSafeEqual } from "node:crypto"

const COOKIE_NAME_PREFIX = "brief_unlock_"
const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours

function getSecret(): string {
  const secret = import.meta.env.BRIEF_COOKIE_SECRET
  if (!secret || secret.length < 32) {
    throw new Error(
      "BRIEF_COOKIE_SECRET must be set and >= 32 chars in the environment.",
    )
  }
  return secret
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const buf1 = Buffer.from(a, "hex")
  const buf2 = Buffer.from(b, "hex")
  if (buf1.length !== buf2.length) return false
  return timingSafeEqual(buf1, buf2)
}

export function cookieNameForBrief(publicId: string): string {
  return COOKIE_NAME_PREFIX + publicId
}

/** Build the cookie value: `<issuedAt>.<signature>`. */
export function buildUnlockCookieValue(publicId: string): {
  name: string
  value: string
  maxAge: number
} {
  const issuedAt = Math.floor(Date.now() / 1000).toString()
  const payload = `${publicId}.${issuedAt}`
  const sig = sign(payload)
  return {
    name: cookieNameForBrief(publicId),
    value: `${issuedAt}.${sig}`,
    maxAge: COOKIE_MAX_AGE,
  }
}

/** Returns true if the given cookie value unlocks the given brief. */
export function verifyUnlockCookie(
  publicId: string,
  cookieValue: string | undefined,
): boolean {
  if (!cookieValue) return false
  const parts = cookieValue.split(".")
  if (parts.length !== 2) return false
  const [issuedAt, sig] = parts
  if (!issuedAt || !sig) return false

  const ageSec = Math.floor(Date.now() / 1000) - Number(issuedAt)
  if (!Number.isFinite(ageSec) || ageSec < 0 || ageSec > COOKIE_MAX_AGE) {
    return false
  }

  const expected = sign(`${publicId}.${issuedAt}`)
  try {
    return safeEqual(expected, sig)
  } catch {
    return false
  }
}
