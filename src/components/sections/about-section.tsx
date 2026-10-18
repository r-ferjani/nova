import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { pageHref } from "@/i18n/paths";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section
      id={locale === "da" ? "om-os" : "about"}
      className="relative scroll-mt-24 bg-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="about-heading"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Visual */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-5 -top-5 -z-10 size-full rounded-[1.75rem] border border-line"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-mist p-2 shadow-soft">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                <Image
                  src="/image.jpg"
                  alt={dict.about.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 40rem, (min-width: 640px) 90vw, 95vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Highlight card */}
            <div className="absolute -bottom-6 left-6 right-6 sm:left-8 sm:right-auto">
              <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-white/95 px-5 py-4 shadow-lift backdrop-blur-md">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <BadgeCheck className="size-5.5" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span className="text-sm font-bold leading-snug text-ink-900">
                  {dict.about.highlightTrust}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <SectionHeading
            eyebrow={dict.about.eyebrow}
            title={dict.about.heading}
            align="left"
            id="about-heading"
          />

          <div className="flex flex-col gap-4">
            {dict.about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.08 * (index + 1)}>
                <p
                  className={
                    index === 0
                      ? "text-lead text-ink-700 text-pretty"
                      : "text-pretty text-ink-600"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <Button
              href={pageHref("contact", locale)}
              variant="secondary"
              size="lg"
              withArrow
              className="mt-2 w-full sm:w-auto"
            >
              {dict.nav.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
