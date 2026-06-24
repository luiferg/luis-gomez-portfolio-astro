/**
 * Two templates:
 *  - renderResponseReceived: confirmation to the client (localized: es | en)
 *  - renderAdminNewResponse: notification to the admin (always English)
 */

import type { Locale } from "@/lib/brief-schemas/locale"

const CLIENT_COPY = {
  es: {
    subject: (tpl: string) => `Recibimos tu brief \u2014 ${tpl}`,
    title: "Brief recibido",
    greeting: (name: string) => `Hola ${name},`,
    intro: (tpl: string) =>
      `Recibimos tu brief para <strong>${tpl}</strong>. Lo revisar\u00e9 y te respondo pronto.`,
    introText: (tpl: string) =>
      `Recibimos tu brief para "${tpl}". Lo revisar\u00e9 y te respondo pronto.`,
    note: "Si necesitas agregar o corregir algo, simplemente responde a este correo.",
    signature: "\u2014 Luis",
    htmlLang: "es",
  },
  en: {
    subject: (tpl: string) => `We received your brief \u2014 ${tpl}`,
    title: "Brief received",
    greeting: (name: string) => `Hi ${name},`,
    intro: (tpl: string) =>
      `We received your brief for <strong>${tpl}</strong>. I'll review it and get back to you soon.`,
    introText: (tpl: string) =>
      `We received your brief for "${tpl}". I'll review it and get back to you soon.`,
    note: "If you need to add or correct anything, just reply to this email.",
    signature: "\u2014 Luis",
    htmlLang: "en",
  },
} as const satisfies Record<Locale, Record<string, unknown>>

type ClientArgs = {
  clientName: string
  templateName: string
  locale: Locale
}

export function renderResponseReceived(args: ClientArgs) {
  const { clientName, templateName, locale } = args
  const t = CLIENT_COPY[locale]

  const subject = t.subject(templateName)
  const text = `${t.greeting(clientName)}

${t.introText(templateName)}

${t.note}

${t.signature}
luisgomez.dev`

  const html = baseHtml({
    htmlLang: t.htmlLang,
    title: t.title,
    body: `
      <p>${escape(t.greeting(clientName))}</p>
      <p>${t.intro(escape(templateName))}</p>
      <p style="color:#888">${escape(t.note)}</p>
      <p>${escape(t.signature)}<br/><a href="https://luisgomez.dev" style="color:#888">luisgomez.dev</a></p>
    `,
  })

  return { subject, text, html }
}

export function renderAdminNewResponse(args: {
  clientName: string
  templateName: string
  briefAdminUrl: string
}) {
  const { clientName, templateName, briefAdminUrl } = args
  const subject = `New brief response \u2014 ${clientName}`

  const text = `${clientName} just submitted the brief "${templateName}".

Open it:
${briefAdminUrl}`

  const html = baseHtml({
    htmlLang: "en",
    title: "New brief response",
    body: `
      <p><strong>${escape(clientName)}</strong> just submitted the brief <strong>${escape(templateName)}</strong>.</p>
      <p><a href="${escape(briefAdminUrl)}" style="display:inline-block;padding:10px 14px;background:#111;color:#fff;text-decoration:none;font-family:monospace">Open response</a></p>
      <p style="color:#888;font-size:12px">${escape(briefAdminUrl)}</p>
    `,
  })

  return { subject, text, html }
}

function baseHtml({
  htmlLang,
  title,
  body,
}: {
  htmlLang: string
  title: string
  body: string
}) {
  return `<!doctype html>
<html lang="${htmlLang}">
<head>
<meta charset="utf-8" />
<title>${escape(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;color:#111">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid #e5e5e5">
<tr><td style="padding:32px 28px;line-height:1.55;font-size:15px">
${body}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
