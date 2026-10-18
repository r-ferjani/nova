"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CookieIcon, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "nova:cookie-consent";

type ConsentRecord = {
  status: "accepted";
  analytics: boolean;
  version: number;
};

const CONSENT_VERSION = 1;

export function CookieConsent({ dict }: { dict: Dictionary }) {
  const t = dict.cookieConsent;
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const showTimer = window.setTimeout(() => setVisible(true), 900);
      return () => window.clearTimeout(showTimer);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const openPreferences = () => {
      setPreferencesOpen(true);
      setVisible(true);
    };
    window.addEventListener("nova:open-cookie-preferences", openPreferences);
    return () =>
      window.removeEventListener("nova:open-cookie-preferences", openPreferences);
  }, []);

  const persist = (analytics: boolean) => {
    const record: ConsentRecord = {
      status: "accepted",
      analytics,
      version: CONSENT_VERSION,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Storage may be unavailable (private mode, blocked cookies).
      // The site still works — only the dismissal is not remembered.
    }
    setVisible(false);
    setPreferencesOpen(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="cookie-consent"
          className="fixed inset-x-0 bottom-0 z-[85] p-4 sm:p-6"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label={t.title}
        >
          <div className="container-page">
            <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-white/95 p-6 shadow-lift backdrop-blur-xl sm:p-7">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <CookieIcon className="size-5.5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-base font-bold text-ink-950">{t.title}</h2>
                    <p className="text-sm text-pretty text-ink-600">{t.description}</p>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {preferencesOpen ? (
                    <motion.div
                      key="preferences"
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-col gap-3 border-t border-line pt-5">
                        <li className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-ink-900">
                              {t.necessaryLabel}
                            </span>
                            <span className="text-xs text-ink-600">
                              {t.necessaryDescription}
                            </span>
                          </div>
                          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                            <ShieldCheck className="size-3.5" aria-hidden="true" />
                            {t.necessaryLabel}
                          </span>
                        </li>
                        <li className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-ink-900">
                              {t.analyticsLabel}
                            </span>
                            <span className="text-xs text-ink-600">
                              {t.analyticsDescription}
                            </span>
                          </div>
                          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs font-bold text-ink-500">
                            Off
                          </span>
                        </li>
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setPreferencesOpen((open) => !open)}
                  >
                    {t.preferences}
                  </Button>
                  <Button variant="primary" size="md" onClick={() => persist(false)}>
                    {t.accept}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
