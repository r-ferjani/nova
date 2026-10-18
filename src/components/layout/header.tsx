"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useLang } from "@/components/providers/lang-provider";
import { pageHref } from "@/i18n/paths";
import { Button } from "@/components/ui/button";
import { getNavItems, isItemActive } from "./nav-items";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { Logo } from "./logo";
import { cn } from "@/lib/cn";

type HeaderProps = {
  dict: Dictionary;
};

export function Header({ dict }: HeaderProps) {
  const locale = useLang();
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = getNavItems(dict, locale);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[70] transition-[background-color,box-shadow,border-color] duration-500",
          scrolled
            ? "border-b border-line bg-white/85 shadow-soft backdrop-blur-xl"
            : "border-b border-transparent bg-white/55 backdrop-blur-md",
        )}
      >
        <div className="container-page">
          <div className="flex h-[var(--header-height)] items-center justify-between gap-3">
            <Logo
              locale={locale}
              wordmarkClassName="hidden sm:flex"
            />

            <nav
              aria-label={dict.nav.primaryLabel}
              className="hidden items-center gap-1 md:flex"
            >
              {items.map((item) => {
                const active = isItemActive(item, pathname);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300",
                      active ? "text-brand-700" : "text-ink-600 hover:text-brand-700",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 bottom-1.5 h-[2.5px] origin-left rounded-full bg-gradient-to-r from-brand-600 to-teal-500 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher className="hidden md:flex" />
              <Button
                href={pageHref("contact", locale)}
                size="md"
                withArrow
                className="hidden lg:inline-flex"
              >
                {dict.nav.cta}
              </Button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={dict.nav.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink-800 shadow-soft transition-colors duration-300 hover:bg-mist md:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        dict={dict}
        locale={locale}
        items={items}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
