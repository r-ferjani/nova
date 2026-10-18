import nodemailer from "nodemailer";
const t = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: process.env.SMTP_USER && process.env.SMTP_PASSWORD
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
});
console.log("host:", process.env.SMTP_HOST, "| user:", process.env.SMTP_USER,
  "| demo:", process.env.FORM_DEMO_MODE, "| to:", process.env.CONTACT_EMAIL);
try {
  await t.verify(); console.log("SMTP verify: OK");
  const info = await t.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: (process.env.CONTACT_EMAIL ?? "").split(",").map(s => s.trim()).filter(Boolean),
    subject: "Test SMTP — NOVA PRIME",
    text: "Test direct depuis la VPS.",
  });
  console.log("Envoyé:", info.response);
} catch (e) { console.error("ÉCHEC:", e.message, e.code ?? "", e.command ?? ""); }
