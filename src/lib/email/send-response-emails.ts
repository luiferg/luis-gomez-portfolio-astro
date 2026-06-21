import { getEmailConfig, getResend } from "./client"
import {
  renderAdminNewResponse,
  renderResponseReceived,
} from "./templates/response-received"
import type { Locale } from "@/lib/brief-schemas/locale"

type Args = {
  briefId: string
  clientName: string
  clientEmail: string | null
  templateName: string
  locale: Locale
}

/**
 * Fire-and-forget. Sends:
 *   1) Confirmation to the client (if we have their email).
 *   2) Notification to the admin (if ADMIN_NOTIFICATION_EMAIL is set).
 *
 * Logs but never throws — a failed email must not break the submission flow.
 */
export async function sendResponseEmails(args: Args): Promise<void> {
  const resend = getResend()
  if (!resend) return // RESEND_API_KEY not configured; silent no-op.

  const cfg = getEmailConfig()
  const tasks: Promise<unknown>[] = []

  if (args.clientEmail) {
    const tpl = renderResponseReceived({
      clientName: args.clientName,
      templateName: args.templateName,
      locale: args.locale,
    })
    tasks.push(
      resend.emails
        .send({
          from: cfg.from,
          to: args.clientEmail,
          subject: tpl.subject,
          html: tpl.html,
          text: tpl.text,
        })
        .catch((err: unknown) => {
          console.error("[email] client confirmation failed:", err)
        }),
    )
  }

  if (cfg.adminEmail) {
    const briefAdminUrl = cfg.briefingAdminUrl
      ? `${cfg.briefingAdminUrl.replace(/\/$/, "")}/admin/briefs/${args.briefId}?tab=responses`
      : `/admin/briefs/${args.briefId}?tab=responses`
    const tpl = renderAdminNewResponse({
      clientName: args.clientName,
      templateName: args.templateName,
      briefAdminUrl,
    })
    tasks.push(
      resend.emails
        .send({
          from: cfg.from,
          to: cfg.adminEmail,
          subject: tpl.subject,
          html: tpl.html,
          text: tpl.text,
        })
        .catch((err: unknown) => {
          console.error("[email] admin notification failed:", err)
        }),
    )
  }

  await Promise.allSettled(tasks)
}
