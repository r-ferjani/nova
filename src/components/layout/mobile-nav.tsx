"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { pageHref } from "@/i18n/paths";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { isItemActive, type NavItem } from "./nav-items";
import { Logo } from "./logo";
import { cn } from "@/lib/cn";

type MobileNavProps = {
  dict: Dictionary;
  locale: Locale;
  items: NavItem[];
  open: boolean;
  onClose: () => void;
};

export function MobileNav({
  dict,
  locale,
  items,
  open,
  onClose,
}: MobileNavProps) {
  const pathname = usePathname() ?? "/";
  const closeRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the panel for keyboard and screen-reader users.
    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-nav"
          className="fixed inset-0 z-[80] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
          aria-hidden={false}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.nav.closeMenu}
            className="absolute inset-0 bg-ink-950/45 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.primaryLabel}
            className="absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col overflow-y-auto bg-paper pb-8 pt-4 shadow-lift"
            initial={{ y: prefersReducedMotion ? 0 : "-1.5rem", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: prefersReducedMotion ? 0 : "-1.5rem", opacity: 0.6 }}
            transition={panelTransition}
          >
            <div className="container-page flex items-center justify-between">
              <Logo locale={locale} />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={dict.nav.closeMenu}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink-700 transition-colors hover:bg-mist"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label={dict.nav.primaryLabel}
              className="container-page mt-6"
            >
              <ul className="flex flex-col">
                {items.map((item, index) => {
                  const active = isItemActive(item, pathname);
                  return (
                    <motion.li
                      key={item.key}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.08 + index * 0.06,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-b border-line"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between py-4 text-xl font-semibold transition-colors",
                          active ? "text-brand-700" : "text-ink-800 hover:text-brand-700",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-500",
                            active ? "w-8 bg-teal-500" : "w-0 bg-transparent",
                          )}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="container-page mt-8 flex flex-col gap-5">
              <Button href={pageHref("contact", locale)} size="lg" withArrow>
                {dict.nav.cta}
              </Button>
              <LanguageSwitcher variant="plain" className="self-start" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
