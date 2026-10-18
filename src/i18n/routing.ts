import {
  defaultLocale,
  isLocale,
  pagePaths,
  servicePaths,
  type Locale,
} from "./config";

/**
 * Detects the locale of a pathname. Danish content lives at the site root,
 * English under `/en/`.
 */
export function localeFromPathname(pathname: string): Locale {
  const normalized = normalize(pathname);
  if (normalized === "/en" || normalized.startsWith("/en/")) return "en";
  return defaultLocale;
}

function normalize(pathname: string): string {
  const withoutHash = pathname.split("#")[0] ?? "";
  const withoutQuery = withoutHash.split("?")[0] ?? "";
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

function withHash(pathname: string, target: string): string {
  const hash = pathname.split("#")[1];
  return hash ? `${target}#${hash}` : target;
}

/**
 * Resolves the equivalent URL for the same page in another language.
 * Returns `null` when no translation of the current URL is known, in which
 * case the caller falls back to the target language's homepage.
 */
export function localizedUrlFor(pathname: string, target: Locale): string {
  const current = localeFromPathname(pathname);
  const normalized = normalize(pathname);

  if (current === target) return withHash(pathname, trailingSlash(normalized));

  for (const key of Object.keys(pagePaths)) {
    const paths = pagePaths[key as keyof typeof pagePaths];
    if (normalize(paths[current]) === normalized) {
      return trailingSlash(paths[target]);
    }
  }

  for (const key of Object.keys(servicePaths)) {
    const paths = servicePaths[key as keyof typeof servicePaths];
    if (normalize(paths[current]) === normalized) {
      return trailingSlash(paths[target]);
    }
  }

  return target === "en" ? "/en/" : "/";
}

function trailingSlash(path: string): string {
  return path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
}

export { isLocale, type Locale };
