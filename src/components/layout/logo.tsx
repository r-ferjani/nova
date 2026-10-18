import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pageHref } from "@/i18n/paths";
import { cn } from "@/lib/cn";

type LogoProps = {
  locale: Locale;
  /** Show the wordmark next to the logo mark. */
  showWordmark?: boolean;
  className?: string;
  /** Extra classes for the wordmark container (e.g. responsive hiding). */
  wordmarkClassName?: string;
  /** Use on dark surfaces — keeps the mark legible. */
  onDark?: boolean;
};

/**
 * Company logo lockup. The supplied `logo.jpg` is a square asset with its own
 * light background, so it is presented on a white chip with a hairline border
 * rather than placed directly on a coloured surface.
 */
export function Logo({
  locale,
  showWordmark = true,
  className,
  wordmarkClassName,
  onDark = false,
}: LogoProps) {
  return (
    <Link
      href={pageHref("home", locale)}
      aria-label="NOVA PRIME SERVICES ApS"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-2xl transition-opacity duration-300 hover:opacity-90 focus-visible:opacity-100",
        className,
      )}
    >
      <span className="relative inline-flex shrink-0">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[0.85rem] bg-gradient-to-br from-teal-400/35 to-brand-400/25 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
        />
        <Image
          src="/logo.jpg"
          alt="NOVA PRIME SERVICES ApS logo"
          width={44}
          height={44}
          priority
          fetchPriority="high"
          sizes="44px"
          className={cn(
            "relative size-11 rounded-[0.85rem] border bg-white object-contain p-[3px] shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
            onDark ? "border-white/25" : "border-line",
          )}
        />
      </span>
      {showWordmark ? (
        <span className={cn("flex flex-col leading-none", wordmarkClassName)}>
          <span
            className={cn(
              "text-[0.95rem] font-extrabold tracking-tight",
              onDark ? "text-white" : "text-ink-950",
            )}
          >
            NOVA PRIME{" "}
            <span className={onDark ? "text-teal-300" : "text-brand-700"}>
              SERVICES
            </span>
          </span>
          <span
            className={cn(
              "mt-1 text-[0.6rem] font-bold uppercase tracking-[0.2em]",
              onDark ? "text-white/55" : "text-ink-400",
            )}
          >
            ApS
          </span>
        </span>
      ) : null}
    </Link>
  );
}
