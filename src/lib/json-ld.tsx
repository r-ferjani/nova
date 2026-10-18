import { siteConfig } from "./site";
import type { Locale } from "@/i18n/config";

/**
 * Renders a JSON-LD structured-data block. Values are escaped so the payload
 * can never break out of its `<script>` element.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}

/**
 * Organization identity built from verified company details in `siteConfig`.
 * LocalBusiness is deliberately omitted until opening hours / service-area
 * policy are confirmed — see the README "Missing company information".
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.jpg`,
    description:
      "Professionel rengøring til private og virksomheder i Danmark.",
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phones[0],
    vatID: siteConfig.contact.cvr,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ringparken 22, 1. tv",
      postalCode: "7500",
      addressLocality: "Holstebro",
      addressCountry: "DK",
    },
  } as const;
}

export function websiteSchema(locale: Locale) {
  const path = locale === "en" ? "/en/" : "/";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${siteConfig.url}${path}`,
    inLanguage: locale === "en" ? "en" : "da",
  } as const;
}

export function serviceSchema(
  locale: Locale,
  name: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: organizationSchema(),
    inLanguage: locale === "en" ? "en" : "da",
  } as const;
}
