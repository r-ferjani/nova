"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowDown,
  BadgeCheck,
  CalendarClock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useLang } from "@/components/providers/lang-provider";
import { pageHref } from "@/i18n/paths";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const word: Variants = {
  hidden: { y: "0.28em", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageReveal: Variants = {
  hidden: { clipPath: "inset(1.5% 0 100% 0)", opacity: 0.4 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
  },
};

export function HeroSection({ dict }: { dict: Dictionary }) {
  const locale = useLang();
  const prefersReducedMotion = useReducedMotion();
  const words = dict.hero.headline.split(" ");
  const accentStart = Math.max(0, words.length - 2);

  const animate = prefersReducedMotion ? false : "visible";

  return (
    <section
      className="relative overflow-hidden bg-offwhite pb-20 pt-28 sm:pb-24 lg:pb-32 lg:pt-36"
      aria-labelledby="hero-headline"
    >
      {/* Decorative background layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="drift absolute -right-[14%] -top-44 size-[38rem] rounded-full bg-gradient-to-br from-teal-200/45 via-brand-100/45 to-transparent blur-3xl" />
        <div className="drift-slow absolute -left-[12%] bottom-[-18%] size-[32rem] rounded-full bg-gradient-to-tr from-brand-100/55 via-gold-300/20 to-transparent blur-3xl" />
        <div className="bg-dots absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(72%_58%_at_52%_0%,black,transparent)]" />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-20">
        {/* ── Copy column ─────────────────────────────── */}
        <motion.div
          className="relative z-[1] flex flex-col items-start gap-7"
          variants={container}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={animate}
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 py-1.5 pl-2 pr-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-brand-700 shadow-soft backdrop-blur-sm"
          >
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-brand-600 text-white">
              <Sparkles className="size-3.5" aria-hidden="true" />
            </span>
            {dict.hero.eyebrow}
          </motion.span>

          <h1
            id="hero-headline"
            className="max-w-[16ch] text-display font-semibold text-ink-950 text-balance"
          >
            {words.map((w, index) => (
              <Fragment key={`${w}-${index}`}>
                <span
                  aria-hidden="true"
                  className="inline-block overflow-hidden pb-[0.06em] align-bottom"
                >
                  <motion.span
                    className={cn(
                      "inline-block",
                      index >= accentStart && "text-shimmer",
                    )}
                    variants={word}
                  >
                    {w}
                  </motion.span>
                </span>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
            <span className="sr-only">{dict.hero.headline}</span>
          </h1>

          <motion.p
            variants={item}
            className="max-w-xl text-lead text-ink-600 text-pretty"
          >
            {dict.hero.description}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center"
          >
            <Button
              href={pageHref("contact", locale)}
              size="lg"
              withArrow
              className="w-full sm:w-auto"
            >
              {dict.hero.primaryCta}
            </Button>
            <Button
              href={pageHref("services", locale)}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {dict.hero.secondaryCta}
            </Button>
          </motion.div>

          <motion.ul
            variants={item}
            className="flex flex-wrap gap-x-5 gap-y-2.5 pt-2"
          >
            {[
              { icon: ShieldCheck, label: dict.hero.badgeReliable },
              { icon: CalendarClock, label: dict.hero.badgeFlexible },
              { icon: BadgeCheck, label: dict.hero.badgePrivate },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700"
              >
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <Icon className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── Visual column ──────────────────────────── */}
        <div className="relative">
          <motion.div
            className="relative"
            initial={prefersReducedMotion ? false : "hidden"}
            animate={animate}
            variants={imageReveal}
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white p-2 shadow-lift">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-mist">
                <Image
                  src="/image.jpg"
                  alt={dict.hero.imageAlt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 34rem, (min-width: 640px) 60vw, 85vw"
                  className="object-cover"
                />
                {/* readability gradient for the floating cards */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Accent ring */}
            <div
              aria-hidden="true"
              className="absolute -right-5 -top-5 -z-[1] size-28 rounded-full border-[3px] border-teal-400/50"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-6 right-10 -z-[1] size-16 rounded-full bg-gold-400/30 blur-md"
            />
          </motion.div>

          {/* Floating cards */}
          <motion.div
            className="absolute -left-4 bottom-10 sm:-left-8 lg:-left-10"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.85,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="float flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur-md">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold leading-tight text-ink-900">
                {dict.hero.badgeReliable}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-3 top-12 sm:-right-6 lg:-right-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 1.0,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="float-slow flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur-md">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <CalendarClock className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold leading-tight text-ink-900">
                {dict.hero.badgeFlexible}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="container-page mt-16 hidden justify-center lg:flex"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.5, duration: 0.9 }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-ink-400">
          <span>{dict.hero.scrollHint}</span>
          <span className="relative flex h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute left-0 top-0 h-3 w-px bg-gradient-to-b from-teal-500 to-transparent"
              animate={prefersReducedMotion ? undefined : { y: [0, 40, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
          <ArrowDown className="size-3.5" aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
}
