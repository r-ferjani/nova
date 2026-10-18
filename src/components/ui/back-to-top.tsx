"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

export function BackToTop({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 640);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: prefersReducedMotion ? "auto" : "smooth",
            });
          }}
          aria-label={dict.common.backToTop}
          className="fixed bottom-5 right-5 z-[75] inline-flex size-12 items-center justify-center rounded-full bg-brand-700 text-white shadow-lift transition-colors duration-300 hover:bg-brand-800 sm:bottom-7 sm:right-7"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowUp className="size-5" strokeWidth={2.4} aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
