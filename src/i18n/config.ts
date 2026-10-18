export const locales = ["da", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "da";

export const localeLabels: Record<Locale, string> = {
  da: "Dansk",
  en: "English",
};

export const localeShortLabels: Record<Locale, string> = {
  da: "DA",
  en: "EN",
};

export const localeHtmlLang: Record<Locale, string> = {
  da: "da",
  en: "en",
};

/**
 * Internal route key -> localized href.
 * Danish never carries a locale prefix; English always lives under `/en/`.
 * This table is the single source of truth for the language switcher and
 * for all internal links.
 */
export const pagePaths = {
  home: { da: "/", en: "/en/" },
  services: { da: "/#ydelser", en: "/en/#services" },
  about: { da: "/#om-os", en: "/en/#about" },
  process: { da: "/#saadan-fungerer-det", en: "/en/#how-it-works" },
  contact: { da: "/#kontakt", en: "/en/#contact" },
  privacy: { da: "/privatlivspolitik/", en: "/en/privacy-policy/" },
} as const;

export type PageKey = keyof typeof pagePaths;

export const serviceOrder = [
  "home-cleaning",
  "commercial-cleaning",
  "move-out-cleaning",
  "deep-cleaning",
] as const;

export type ServiceKey = (typeof serviceOrder)[number];

export const servicePaths: Record<ServiceKey, Record<Locale, string>> = {
  "home-cleaning": {
    da: "/services/privat-rengoring/",
    en: "/en/services/home-cleaning/",
  },
  "commercial-cleaning": {
    da: "/services/erhvervsrengoring/",
    en: "/en/services/commercial-cleaning/",
  },
  "move-out-cleaning": {
    da: "/services/flytterengøring/",
    en: "/en/services/move-out-cleaning/",
  },
  "deep-cleaning": {
    da: "/services/hovedrengøring/",
    en: "/en/services/deep-cleaning/",
  },
};

/**
 * Mapping between a Danish slug and its English counterpart, used by
 * generateStaticParams so both language versions of every service page
 * are prerendered at build time.
 */
export const serviceSlugPairs: Record<
  string,
  { da: string; en: string; key: ServiceKey }
> = {
  "privat-rengoring": {
    da: "privat-rengoring",
    en: "home-cleaning",
    key: "home-cleaning",
  },
  erhvervsrengoring: {
    da: "erhvervsrengoring",
    en: "commercial-cleaning",
    key: "commercial-cleaning",
  },
  "flytterengøring": {
    da: "flytterengøring",
    en: "move-out-cleaning",
    key: "move-out-cleaning",
  },
  hovedrengøring: {
    da: "hovedrengøring",
    en: "deep-cleaning",
    key: "deep-cleaning",
  },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "da" || value === "en";
}

/**
 * Resolve a service slug — Danish OR English — to its slug pair, so both
 * language versions of a service page render from the same dynamic route.
 */
export function findServicePair(
  slug: string,
  locale: Locale,
): { da: string; en: string; key: ServiceKey } | undefined {
  const decoded = decodeURIComponent(slug);
  return Object.values(serviceSlugPairs).find(
    (pair) => pair[locale] === decoded,
  );
}
