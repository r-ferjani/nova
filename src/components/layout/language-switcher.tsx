"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { useLang } from "@/components/providers/lang-provider";
import { localizedUrlFor } from "@/i18n/routing";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  className?: string;
  variant?: "pill" | "plain";
};

/**
 * Segmented language control rendered as links so keyboard navigation,
 * middle-click and "open in new tab" all behave natively. The active language
 * is conveyed with both colour and a check mark — never colour alone.
 */
export function LanguageSwitcher({
  className,
  variant = "pill",
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const current = useLang();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-line bg-white/70 p-1 shadow-soft backdrop-blur-md",
        variant === "plain" && "border-transparent bg-transparent shadow-none",
        className,
      )}
    >
      <span className="sr-only">Vælg sprog / Select language</span>
      {locales.map((locale: Locale) => {
        const isActive = locale === current;
        const href = localizedUrlFor(pathname, locale);

        return (
          <Link
            key={locale}
            href={href}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-snug transition-colors duration-300",
              isActive
                ? "bg-brand-700 text-white shadow-soft"
                : "text-ink-500 hover:bg-mist hover:text-brand-700",
              variant === "plain" && isActive && "bg-mist text-brand-700",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "text-[0.7rem] transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-0",
              )}
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            {localeLabels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
