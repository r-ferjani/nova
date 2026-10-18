import { FileWarning } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { pageHref } from "@/i18n/paths";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function PrivacyContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <article className="bg-offwhite pb-20 pt-32 sm:pt-36 lg:pb-28">
      <div className="container-page max-w-3xl">
        <Reveal>
          <span className="eyebrow">{dict.privacy.eyebrow}</span>
          <h1 className="mt-4 text-display font-semibold text-ink-950 text-balance">
            {dict.privacy.heading}
          </h1>
          <p className="mt-6 text-lead text-ink-600 text-pretty">
            {dict.privacy.intro}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-gold-400/40 bg-gold-300/15 p-5">
            <FileWarning
              className="mt-0.5 size-5 shrink-0 text-gold-600"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-ink-700 text-pretty">
              {dict.privacy.reviewNote}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10">
          {dict.privacy.sections.map((section, index) => (
            <Reveal key={section.title} delay={0.04 * index}>
              <section className="flex flex-col gap-4">
                <h2 className="flex items-baseline gap-3 text-title font-semibold text-ink-950">
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-display)] text-base font-semibold text-teal-600"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <p className="text-pretty leading-relaxed text-ink-700">
                  {section.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-line pt-8">
            <Button
              href={pageHref("contact", locale)}
              variant="secondary"
              size="lg"
              withArrow
            >
              {dict.nav.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
