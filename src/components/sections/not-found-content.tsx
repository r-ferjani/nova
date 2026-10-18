"use client";

import { usePathname } from "next/navigation";
import { Compass } from "lucide-react";
import { dictionaries } from "@/i18n/dictionaries";
import { pageHref } from "@/i18n/paths";
import { Button } from "@/components/ui/button";

/**
 * The not-found boundary cannot access route params, so the locale is derived
 * from the pathname. This keeps the 404 page monolingual, matching the rest
 * of the site.
 */
export function NotFoundContent() {
  const pathname = usePathname() ?? "/";
  const locale = pathname.startsWith("/en") ? "en" : "da";
  const dict = dictionaries[locale];

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-offwhite py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="drift absolute -right-20 -top-24 size-[30rem] rounded-full bg-gradient-to-br from-teal-200/45 via-brand-100/45 to-transparent blur-3xl" />
        <div className="bg-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
      </div>

      <div className="container-page flex flex-col items-center gap-7 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lg shadow-brand-900/20">
          <Compass className="size-8" strokeWidth={1.8} aria-hidden="true" />
        </span>

        <p className="font-[family-name:var(--font-display)] text-7xl font-semibold leading-none text-brand-200 sm:text-8xl">
          404
        </p>

        <h1 className="max-w-[22ch] text-headline font-semibold text-ink-950 text-balance">
          {dict.notFound.heading}
        </h1>

        <p className="max-w-md text-lead text-ink-600 text-pretty">
          {dict.notFound.description}
        </p>

        <Button href={pageHref("home", locale)} size="lg" withArrow className="mt-2">
          {dict.notFound.backHome}
        </Button>
      </div>
    </section>
  );
}
