import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Check,
  Home,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { findServicePair, isLocale, locales, serviceSlugPairs, type Locale, type ServiceKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageHref, serviceHref } from "@/i18n/paths";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, serviceSchema } from "@/lib/json-ld";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { cn } from "@/lib/cn";

const serviceIcons: Record<ServiceKey, LucideIcon> = {
  "home-cleaning": Home,
  "commercial-cleaning": Building2,
  "move-out-cleaning": Truck,
  "deep-cleaning": Sparkles,
};

const tileAccents: Record<ServiceKey, string> = {
  "home-cleaning": "from-brand-500 to-brand-700",
  "commercial-cleaning": "from-teal-500 to-teal-700",
  "move-out-cleaning": "from-teal-600 to-brand-700",
  "deep-cleaning": "from-brand-600 to-ink-900",
};

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const pair of Object.values(serviceSlugPairs)) {
      params.push({ lang: locale, slug: pair[locale] });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const pair = findServicePair(slug, lang);
  if (!pair) return {};

  const dict = getDictionary(lang);
  const service = dict.services.items[pair.key];

  return pageMetadata({
    title: service.title,
    description: service.description,
    daPath: serviceHref(pair.key, "da"),
    enPath: serviceHref(pair.key, "en"),
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }
  const locale = lang as Locale;

  const pair = findServicePair(slug, locale);
  if (!pair) {
    notFound();
  }

  const dict = getDictionary(locale);
  const service = dict.services.items[pair.key];
  const Icon = serviceIcons[pair.key];
  const contactHref = pageHref("contact", locale);
  const quoteHref = `${contactHref}${
    contactHref.includes("?") ? "&" : "?"
  }service=${pair.key}`;

  const otherServices = (Object.keys(serviceIcons) as ServiceKey[]).filter(
    (key) => key !== pair.key,
  );

  return (
    <>
      <JsonLd
        data={serviceSchema(locale, service.title, service.description)}
      />
      <section className="relative overflow-hidden bg-offwhite pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="drift absolute -right-24 -top-32 size-[32rem] rounded-full bg-gradient-to-br from-teal-200/45 via-brand-100/45 to-transparent blur-3xl" />
          <div className="bg-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(72%_58%_at_52%_0%,black,transparent)]" />
        </div>

        <div className="container-page">
          <Reveal>
            <Link
              href={`${pageHref("services", locale)}`}
              className="group inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition-colors hover:text-teal-700"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              {dict.servicePage.backToServices}
            </Link>
          </Reveal>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="flex flex-col gap-6">
              <span
                className={cn(
                  "inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg shadow-brand-900/15",
                  tileAccents[pair.key],
                )}
              >
                <Icon className="size-7.5" strokeWidth={1.9} aria-hidden="true" />
              </span>

              <h1 className="max-w-[20ch] text-display font-semibold text-ink-950 text-balance">
                {service.title}
              </h1>
              <p className="max-w-xl text-lead text-ink-600 text-pretty">
                {service.description}
              </p>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={quoteHref} size="lg" withArrow className="w-full sm:w-auto">
                  {dict.servicePage.getQuote}
                </Button>
                <Button
                  href={contactHref}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {dict.servicePage.contactUs}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="text-headline font-semibold text-ink-950">
              {dict.servicePage.included}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-offwhite px-5 py-4 transition-all duration-300 hover:border-brand-200 hover:bg-white hover:shadow-soft"
                >
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <Check className="size-3.5" strokeWidth={3.2} aria-hidden="true" />
                  </span>
                  <span className="font-medium text-ink-800 text-pretty">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaSection dict={dict} locale={locale} />

      <section className="bg-offwhite py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <h2 className="text-headline font-semibold text-ink-950">
              {dict.servicePage.otherServices}
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {otherServices.map((key) => {
              const other = dict.services.items[key];
              const OtherIcon = serviceIcons[key];
              return (
                <Reveal key={key} delay={0.06}>
                  <li className="h-full">
                    <Link
                      href={serviceHref(key, locale)}
                      className="group flex h-full flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift"
                    >
                      <span
                        className={cn(
                          "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white transition-transform duration-500 group-hover:scale-105",
                          tileAccents[key],
                        )}
                      >
                        <OtherIcon className="size-5.5" strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="text-lg font-bold text-ink-950">
                        {other.title}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-600 text-pretty">
                        {other.description}
                      </span>
                      <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-brand-700 transition-colors group-hover:text-teal-700">
                        {dict.services.learnMore}
                        <span
                          aria-hidden="true"
                          className="h-px w-5 bg-brand-300 transition-all duration-300 group-hover:w-8 group-hover:bg-teal-500"
                        />
                      </span>
                    </Link>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
