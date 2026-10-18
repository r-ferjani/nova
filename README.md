# NOVA PRIME SERVICES ApS — Website

Bilingual (Danish default / English) premium website for a Danish cleaning company. Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, Motion, React Hook Form + Zod, and Nodemailer.

## Quick start

```bash
npm install
npm run dev        # development server (http://localhost:3000)
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

Danish is served at the site root (`/`), English under `/en/`. There is no IP-based redirection; users pick their language with the switcher in the header.

## Environment variables

Copy `.env.example` to `.env` and fill in real values. **Never commit the filled-in `.env`.**

| Variable | Purpose |
| --- | --- |
| `PUBLIC_SITE_URL` | Public origin used for canonical URLs, sitemap, Open Graph (default `https://novaprime.dk`). |
| `CONTACT_EMAIL` | Inbox that receives contact-form submissions. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_SECURE` / `SMTP_FROM` | Outbound mail transport. When unset, the contact form honestly reports that e-mail is not yet configured — it does **not** simulate a successful send. |
| `FORM_DEMO_MODE` | Set to `1` to force the honest "not configured" state in development. |

## Project layout

```
src/
  app/                    # App Router: [lang] layout + pages, api/contact, sitemap, robots, 404
  components/
    layout/               # Header, Footer, MobileNav, Logo, LanguageSwitcher
    sections/             # Hero, TrustStrip, Services, Benefits, About, Process, CTA, Contact
    providers/            # LangProvider (React context for the active locale)
    ui/                   # Reveal, CookieConsent, ScrollProgress, BackToTop, form fields
  i18n/                   # locale config, route tables, per-service slug pairs, dictionaries (da/en)
  lib/                    # site config, zod schema, SEO helpers, JSON-LD
public/                   # logo.jpg, image.jpg (client-supplied), open-graph.jpg, icon.png
```

All copy lives in `src/i18n/dictionaries.ts`. Service route pairs (Danish vs. English slugs) live in `src/i18n/config.ts`.

## Verification status

- `npm run typecheck` — clean.
- `npm run build` — succeeds, 19 static pages generated.
- Playwright browser QA suite (real Chrome, both locales, viewports 360/390/768/1024/1440): **48/48 checks pass**, including language switching, service pages (both locales, including the non-ASCII Danish slug), privacy pages, 404s, mobile menu, contact-form validation and honest failure state, reduced-motion behaviour, sitemap/robots/hreflang/canonical/JSON-LD, and absence of reference-site content.

## Company information

Contact details are configured in `src/lib/site.ts` (single source of truth, also rendered in the footer and JSON-LD):

- **E-mail**: info@novaprimes.dk (`CONTACT_EMAIL` in `.env` receives form submissions)
- **Phone**: +45 42 22 33 62 · +45 91 94 09 34
- **Address**: Ringparken 22, 1. tv, 7500 Holstebro
- **CVR**: DK46797485

Still intentionally not invented (update before publication):

- Opening hours
- Social media accounts (none are linked or claimed)
- Confirmation of the "free quote" policy (`freeQuoteConfirmed` is `false`; wording stays descriptive)

Real SMTP credentials are required for the contact form to deliver mail.
