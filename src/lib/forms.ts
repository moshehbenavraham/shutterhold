/**
 * Contact form submission helper.
 *
 * Behavior:
 * 1. If VITE_CONTACT_FORM_ENDPOINT is set, POSTs the payload as JSON.
 *    The endpoint should respond 2xx on success.
 * 2. Otherwise, opens a prefilled mailto: draft to VITE_CONTACT_EMAIL
 *    (defaults to hello@morganblake.com) so the message is not silently dropped.
 *
 * Returns a discriminated union so the caller can render the right copy
 * for each outcome (toast title, status text, error message).
 */

export const CONTACT_EMAIL: string =
  (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ??
  "hello@morganblake.com";

export const CONTACT_ENDPOINT: string | undefined = import.meta.env
  .VITE_CONTACT_FORM_ENDPOINT as string | undefined;

export const HAS_CONTACT_ENDPOINT: boolean = Boolean(
  CONTACT_ENDPOINT && CONTACT_ENDPOINT.trim().length > 0
);

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  /** Where the form was submitted from (e.g. "contact-page", "about-page") */
  source?: string;
};

export type ContactResult =
  | { ok: true; mode: "endpoint" | "mailto" }
  | { ok: false; error: string };

function buildMailtoHref(payload: ContactPayload): string {
  const sourceLine = payload.source ? `Sent from: ${payload.source}\n\n` : "";
  const subject = `New inquiry from ${payload.name}`;
  const body =
    `${sourceLine}` +
    `Name: ${payload.name}\n` +
    `Email: ${payload.email}\n\n` +
    `${payload.message}\n`;
  const qs = new URLSearchParams({ subject, body }).toString();
  // URLSearchParams encodes spaces as +, but RFC 6068 mailto uses %20.
  return `mailto:${CONTACT_EMAIL}?${qs.replace(/\+/g, "%20")}`;
}

export async function sendContactMessage(
  payload: ContactPayload
): Promise<ContactResult> {
  if (HAS_CONTACT_ENDPOINT && CONTACT_ENDPOINT) {
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        return {
          ok: false,
          error: `Submission failed (${res.status}). Please try again or email ${CONTACT_EMAIL} directly.`,
        };
      }
      return { ok: true, mode: "endpoint" };
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Network error";
      return {
        ok: false,
        error: `Could not reach the contact endpoint: ${detail}. Please email ${CONTACT_EMAIL} directly.`,
      };
    }
  }

  // Fallback: open the visitor's email client with a prefilled draft.
  if (typeof window !== "undefined") {
    window.location.href = buildMailtoHref(payload);
  }
  return { ok: true, mode: "mailto" };
}
