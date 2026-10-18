import Link from "next/link";
import {
  Building2,
  Check,
  Home,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale, ServiceKey } from "@/i18n/config";
import { serviceOrder } from "@/i18n/config";
import { pageHref, serviceHref } from "@/i18n/paths";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/ui/reveal";
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

export function ServicesSection({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const contactHref = pageHref("contact", locale);

  return (
    <section
      id={locale === "da" ? "ydelser" : "services"}
      className="relative scroll-mt-24 bg-offwhite py-20 sm:py-24 lg:py-32"
      aria-labelledby="services-heading"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.nav.services}
          title={dict.services.heading}
          description={dict.services.intro}
          id="services-heading"
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-7">
          {serviceOrder.map((key, index) => {
            const service = dict.services.items[key];
            const Icon = serviceIcons[key];
            const quoteHref = `${contactHref}${
              contactHref.includes("?") ? "&" : "?"
            }service=${key}`;

            return (
              <StaggerItem key={key}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift sm:p-8",
                  )}
                >
                  {/* Corner index numeral */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-6 top-3 font-[family-name:var(--font-display)] text-5xl font-semibold leading-none text-mist transition-colors duration-500 group-hover:text-teal-100/80"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-5">
                    <span
                      className={cn(
                        "relative inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg shadow-brand-900/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:-rotate-2",
                        tileAccents[key],
                      )}
                    >
                      <Icon className="size-6" strokeWidth={1.9} aria-hidden="true" />
                    </span>

                    <h3 className="text-title font-semibold text-ink-950">
                      {service.title}
                    </h3>
                    <p className="text-pretty text-ink-600">{service.description}</p>
                  </div>

                  <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-ink-700"
                      >
                        <span className="mt-0.5 inline-flex size-4.5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                          <Check
                            className="size-3"
                            strokeWidth={3.2}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-pretty">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button href={quoteHref} size="md" withArrow>
                      {dict.services.getQuote}
                    </Button>
                    <Link
                      href={serviceHref(key, locale)}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-teal-700"
                    >
                      {dict.services.learnMore}
                      <span
                        aria-hidden="true"
                        className="h-px w-5 bg-brand-300 transition-all duration-300 group-hover/link:w-8 group-hover/link:bg-teal-500"
                      />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal
          delay={0.2}
          className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-ink-500"
        >
          <span className="h-px w-8 bg-line-strong" />
          {dict.common.freeQuoteNote}
          <span className="h-px w-8 bg-line-strong" />
        </Reveal>
      </div>
    </section>
  );
}
