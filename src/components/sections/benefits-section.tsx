import {
  Gem,
  Handshake,
  HeartHandshake,
  SlidersHorizontal,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const benefitIcons: LucideIcon[] = [Gem, Handshake, SlidersHorizontal, HeartHandshake];

export function BenefitsSection({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="surface-navy relative overflow-hidden py-20 text-white sm:py-24 lg:py-32"
      aria-labelledby="benefits-heading"
    >
      {/* Decorative accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="drift-slow absolute -left-20 top-10 size-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="drift absolute -right-24 bottom-0 size-80 rounded-full bg-brand-400/15 blur-3xl" />
      </div>

      <div className="container-page relative">
        <SectionHeading
          eyebrow={dict.benefits.heading}
          title={dict.benefits.heading}
          description={dict.benefits.intro}
          onDark
          id="benefits-heading"
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {dict.benefits.items.map((benefit, index) => {
            const Icon = benefitIcons[index] ?? Gem;
            return (
              <StaggerItem key={benefit.title}>
                <div className="group relative flex h-full flex-col gap-4 rounded-3xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-teal-400/40 hover:bg-white/[0.08]">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/25 to-brand-400/15 text-teal-300 ring-1 ring-inset ring-white/10 transition-transform duration-500 group-hover:scale-105">
                    <Icon className="size-5.5" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-100/75 text-pretty">
                    {benefit.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-auto h-px w-10 bg-gradient-to-r from-teal-400/70 to-transparent transition-all duration-500 group-hover:w-20"
                  />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Value proposition banner */}
        <Reveal
          delay={0.15}
          className="mt-8 flex flex-col items-start gap-5 rounded-3xl border border-gold-400/25 bg-gradient-to-r from-gold-400/10 via-white/[0.04] to-transparent p-7 sm:flex-row sm:items-center sm:gap-7 sm:p-8 lg:mt-10"
        >
          <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300 ring-1 ring-inset ring-gold-400/30">
            <ReceiptText className="size-6" strokeWidth={1.9} aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-title font-semibold text-white">
              {dict.benefits.pricingTitle}
            </h3>
            <p className="text-pretty text-ink-100/75">{dict.benefits.pricingDescription}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
