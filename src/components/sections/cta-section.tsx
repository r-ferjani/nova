import { ArrowRight, MessagesSquare } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { pageHref } from "@/i18n/paths";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section
      className="relative overflow-hidden bg-offwhite px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
      aria-labelledby="cta-heading"
    >
      <div className="container-page px-0">
        <Reveal className="relative">
          <div className="surface-navy relative overflow-hidden rounded-[1.75rem] px-6 py-14 text-center sm:px-12 sm:py-16 lg:rounded-[2.25rem] lg:px-20 lg:py-20">
            {/* Decorative accents */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="drift absolute -right-10 -top-16 size-64 rounded-full bg-teal-400/20 blur-3xl" />
              <div className="drift-slow absolute -bottom-20 -left-10 size-72 rounded-full bg-brand-400/20 blur-3xl" />
              <div className="bg-dots absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]" />
            </div>

            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-teal-200 backdrop-blur-sm">
                <MessagesSquare className="size-3.5" aria-hidden="true" />
                {dict.nav.cta}
              </span>

              <h2
                id="cta-heading"
                className="text-headline font-semibold text-white text-balance"
              >
                {dict.cta.heading}
              </h2>

              <p className="text-lead text-ink-100/80 text-pretty">{dict.cta.description}</p>

              <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                <Button
                  href={pageHref("contact", locale)}
                  variant="white"
                  size="lg"
                  withArrow
                  className="w-full sm:w-auto"
                >
                  {dict.cta.primary}
                </Button>
                <Button
                  href={pageHref("contact", locale)}
                  variant="ghost-dark"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {dict.cta.secondary}
                </Button>
              </div>

              <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-ink-100/60">
                <ArrowRight className="size-3.5" aria-hidden="true" />
                {dict.common.freeQuoteNote}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
