import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale, PageKey } from "@/i18n/config";
import { pageHref } from "@/i18n/paths";

export type NavItem = {
  key: PageKey;
  label: string;
  href: string;
  /** Site-relative base path used for active-state matching. */
  basePath: string;
  /** Anchor links are only "active" when their hash is present. */
  hash?: string;
};

/** Navigation entries only ever target pages that have a nav label. */
type NavPageKey = "home" | "services" | "about" | "contact";

/**
 * Builds the primary navigation. Danish anchor links resolve to the homepage
 * (`/`), English ones to `/en/`, so `basePath` is stored separately from the
 * raw href for correct active-state detection.
 */
export function getNavItems(dict: Dictionary, locale: Locale): NavItem[] {
  const anchor = (key: NavPageKey, hash: string): NavItem => {
    const href = pageHref(key, locale);
    return {
      key,
      label: dict.nav[key],
      href,
      basePath: stripTrailing(href.split("#")[0] ?? "/"),
      hash,
    };
  };

  return [
    {
      key: "home",
      label: dict.nav.home,
      href: pageHref("home", locale),
      basePath: pageHref("home", locale),
    },
    anchor("services", locale === "da" ? "ydelser" : "services"),
    anchor("about", locale === "da" ? "om-os" : "about"),
    anchor("contact", locale === "da" ? "kontakt" : "contact"),
  ];
}

function stripTrailing(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function isItemActive(item: NavItem, pathname: string): boolean {
  const [rawPath, hash = ""] = pathname.split("#");
  const path = stripTrailing(rawPath ?? "/");

  if (item.hash) {
    return path === item.basePath && hash === item.hash;
  }
  return path === item.basePath;
}
