import type { Metadata } from "next";
import { siteConfig } from "./site";

/**
 * Builds an absolute URL from a site-root-relative path.
 */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, siteConfig.url).toString();
}

/**
 * Produces the `alternates` block (canonical + hreflang) for a page that
 * exists in both languages. Danish URLs never carry a locale prefix.
 */
export function bilingualAlternates(daPath: string, enPath: string) {
  return {
    canonical: absoluteUrl(daPath),
    languages: {
      da: absoluteUrl(daPath),
      en: absoluteUrl(enPath),
      "x-default": absoluteUrl(daPath),
    },
  } as const;
}

type PageMetaInput = {
  title: string;
  description: string;
  daPath: string;
  enPath: string;
  openGraphImage?: string;
};

/**
 * Assembles a complete `Metadata` object for a single page, including
 * Open Graph, Twitter and hreflang alternates.
 */
export function pageMetadata({
  title,
  description,
  daPath,
  enPath,
  openGraphImage,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(daPath);
  const image = openGraphImage ?? siteConfig.defaultOgImage;

  return {
    title,
    description,
    alternates: bilingualAlternates(daPath, enPath),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      locale: daPath === "/" ? "da_DK" : "en_DK",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
