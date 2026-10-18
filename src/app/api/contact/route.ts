import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { serviceOrder } from "@/i18n/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERVICE_VALUES = [...serviceOrder, "other"] as const;
const SERVICE_KEYS = z.enum(SERVICE_VALUES);

/**
 * Server-side validation. Client validation is a convenience only —
 * everything is re-validated here at the trust boundary.
 */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .refine((value) => !/[\r\n<>]/.test(value), { message: "Invalid characters" }),
  email: z.string().trim().toLowerCase().email().max(200),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  service: SERVICE_KEYS,
  customerType: z.enum(["private", "business"]),
  postalCode: z.string().trim().max(20).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10)
    .max(5000)
    .refine((value) => !/[\r\n<>]/.test(value), { message: "Invalid characters" }),
  /** Honeypot field — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

type ContactInput = z.infer<typeof contactSchema>;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isSmtpConfigured(): boolean {
  if (process.env.FORM_DEMO_MODE === "1") return false;
  return Boolean(process.env.SMTP_HOST && process.env.CONTACT_EMAIL);
}

function buildEmail(input: ContactInput, locale: string) {
  const labels =
    locale === "en"
      ? {
          subject: "New quote request — website contact form",
          name: "Name",
          email: "Email",
          phone: "Phone",
          service: "Requested service",
          customerType: "Customer type",
          postalCode: "Postal code",
          message: "Message",
          private: "Private",
          business: "Business",
        }
      : {
          subject: "Ny tilbudsanmodning — hjemmesidens kontaktformular",
          name: "Navn",
          email: "E-mail",
          phone: "Telefon",
          service: "Ønsket service",
          customerType: "Kundetype",
          postalCode: "Postnummer",
          message: "Besked",
          private: "Privat",
          business: "Erhverv",
        };

  const serviceLabel =
    input.service === "other"
      ? locale === "en"
        ? "Other"
        : "Andet"
      : input.service;

  const rows: [string, string][] = [
    [labels.name, input.name],
    [labels.email, input.email],
    [labels.phone, input.phone || "—"],
    [labels.service, serviceLabel],
    [
      labels.customerType,
      input.customerType === "private" ? labels.private : labels.business,
    ],
    [labels.postalCode, input.postalCode || "—"],
  ];

  const text = [
    labels.subject,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `${labels.message}:`,
    input.message,
  ].join("\n");

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;max-width:36rem;color:#12202a">
      <h1 style="font-size:1.25rem;margin:0 0 1.5rem;color:#102945">${escapeHtml(
        labels.subject,
      )}</h1>
      <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:0.4rem 0;border-bottom:1px solid #e2e8e6;color:#58717e;width:9rem;vertical-align:top">${escapeHtml(
              label,
            )}</td>
            <td style="padding:0.4rem 0;border-bottom:1px solid #e2e8e6;font-weight:600;vertical-align:top">${escapeHtml(
              value,
            )}</td>
          </tr>`,
          )
          .join("")}
        <tr>
          <td style="padding:0.4rem 0;color:#58717e;vertical-align:top">${escapeHtml(
            labels.message,
          )}</td>
          <td style="padding:0.4rem 0;vertical-align:top">${escapeHtml(
            input.message,
          )}</td>
        </tr>
      </table>
    </div>`.trim();

  return { subject: labels.subject, text, html };
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_failed",
        issues: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const input = parsed.data;

  // Silent honeypot rejection — bots fill every field.
  if (input.website && input.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  if (!isSmtpConfigured()) {
    // Honest failure: never pretend a message was delivered.
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const locale = new URL(request.url).searchParams.get("locale") === "en" ? "en" : "da";
  const { subject, text, html } = buildEmail(input, locale);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASSWORD
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          }
        : undefined,
  });

  try {
    // CONTACT_EMAIL may list several comma-separated recipients.
    const recipients = (process.env.CONTACT_EMAIL ?? "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: recipients,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log only the delivery failure reason — never the user's message body.
    console.error(
      "[contact] Delivery failed:",
      error instanceof Error ? error.message : "unknown error",
    );

    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405 },
  );
}
