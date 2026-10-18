"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProcessSection({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const prefersReducedMotion = useReducedMotion();
  const steps = dict.process.steps;

  return (
    <section
      id={locale === "da" ? "saadan-fungerer-det" : "how-it-works"}
      className="surface-paper relative overflow-hidden border-y border-line py-20 sm:py-24 lg:py-32"
      aria-labelledby="process-heading"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.process.eyebrow}
          title={dict.process.heading}
          id="process-heading"
        />

        <div className="relative mt-16 lg:mt-20">
          {/* Desktop connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden lg:block"
          >
            <div className="relative h-px bg-line-strong">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-600 via-teal-500 to-teal-400"
                initial={prefersReducedMotion ? false : { scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={index * 0.14}
                className="flex h-full flex-col gap-5"
              >
                  <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6">
                    <span className="relative z-[1] inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 font-[family-name:var(--font-display)] text-xl font-semibold text-white shadow-lg shadow-brand-900/25">
                      {index + 1}
                    </span>
                    {/* Mobile connector */}
                    {index < steps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent lg:hidden"
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-teal-700">
                      {dict.process.stepLabel} {index + 1}
                    </span>
                    <h3 className="text-title font-semibold text-ink-950">
                      {step.title}
                    </h3>
                    <p className="text-pretty text-ink-600">{step.description}</p>
                  </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
