/**
 * Site-wide configuration.
 *
 * Contact details below were supplied by the company. Confirm them before
 * publication and keep this file as the single source of truth.
 */
export const siteConfig = {
  name: "NOVA PRIME SERVICES ApS",
  shortName: "NOVA PRIME SERVICES",
  domain: "novaprime.dk",
  /** Public site URL used for canonical links, sitemap and Open Graph. */
  get url(): string {
    const fromEnv = process.env.PUBLIC_SITE_URL;
    return (fromEnv ?? "https://novaprime.dk").replace(/\/$/, "");
  },
  defaultOgImage: "/open-graph.jpg",
  /** Company contact channels (EAN/CVR: DK46797485). */
  contact: {
    phones: ["+45 42 22 33 62", "+45 91 94 09 34"],
    email: "info@novaprimes.dk",
    address: "Ringparken 22, 1. tv, 7500 Holstebro",
    cvr: "DK46797485",
  },
  /**
   * Set to `true` only once a free quote has been confirmed as company
   * policy. Until then the "free quote" wording remains descriptive of a
   * non-binding offer, never a guaranteed price.
   */
  freeQuoteConfirmed: false,
} as const;
