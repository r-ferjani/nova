import { NextResponse, type NextRequest } from "next/server";

/**
 * Localized routing without a default-locale prefix.
 *
 * Danish content lives at the site root (`/`, `/services/...`) and is stored
 * in the App Router under the `/da` segment. English lives under `/en/` and
 * matches directly. This middleware transparently rewrites root-level URLs to
 * the `/da` segment so the address bar always shows the locale-free Danish
 * path while `[lang]` stays a first-class, statically-prerendered parameter.
 *
 * Language is derived from the URL only — visitors are never redirected based
 * on IP address or browser settings.
 */
const EXCLUDE = /^\/(?:api|_next|en)(?:\/|$)/;
const STATIC_ASSET = /\.(?:svg|png|jpe?g|gif|webp|avif|ico|txt|xml|webmanifest|css|js|mjs|map|woff2?|wasm)$/i;

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (EXCLUDE.test(pathname) || STATIC_ASSET.test(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/da${pathname === "/" ? "/" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
