import Link from "next/link";
import { Info, Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale, ServiceKey } from "@/i18n/config";
import { serviceOrder } from "@/i18n/config";
import { pageHref, serviceHref } from "@/i18n/paths";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { CookiePreferencesButton } from "./cookie-preferences-button";
import { getNavItems } from "./nav-items";

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const year = new Date().getFullYear();
  const navItems = getNavItems(dict, locale);

  return (
    <footer className="surface-navy relative overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="drift-slow absolute -left-20 bottom-0 size-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="drift absolute -right-24 -top-16 size-72 rounded-full bg-brand-400/15 blur-3xl" />
      </div>

      <div className="container-page relative py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.15fr] lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Logo locale={locale} onDark />
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-ink-100/70">
              {dict.footer.tagline}
            </p>
            <div className="flex flex-col gap-3">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-100/50">
                {dict.footer.languageLabel}
              </span>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label={dict.footer.navigationTitle}>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-white">
              {dict.footer.navigationTitle}
            </h2>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center text-sm text-ink-100/75 transition-colors hover:text-teal-300"
                  >
                    <span
                      aria-hidden="true"
                      className="mr-0 h-px w-0 bg-teal-400 transition-all duration-300 group-hover:mr-2 group-hover:w-4"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={dict.footer.servicesTitle}>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-white">
              {dict.footer.servicesTitle}
            </h2>
            <ul className="flex flex-col gap-3">
              {serviceOrder.map((key: ServiceKey) => (
                <li key={key}>
                  <Link
                    href={serviceHref(key, locale)}
                    className="group inline-flex items-center text-sm text-ink-100/75 transition-colors hover:text-teal-300"
                  >
                    <span
                      aria-hidden="true"
                      className="mr-0 h-px w-0 bg-teal-400 transition-all duration-300 group-hover:mr-2 group-hover:w-4"
                    />
                    {dict.services.items[key].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + legal */}
          <div className="flex flex-col gap-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              {dict.footer.contactTitle}
            </h2>
            <div className="flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/[0.05] p-4 text-sm leading-relaxed text-ink-100/70">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group inline-flex items-center gap-3 transition-colors hover:text-teal-300"
              >
                <Mail
                  className="size-4.5 shrink-0 text-teal-300"
                  aria-hidden="true"
                />
                {siteConfig.contact.email}
              </a>
              {siteConfig.contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="group inline-flex items-center gap-3 transition-colors hover:text-teal-300"
                >
                  <Phone
                    className="size-4.5 shrink-0 text-teal-300"
                    aria-hidden="true"
                  />
                  {phone}
                </a>
              ))}
              <p className="inline-flex items-start gap-3">
                <MapPin
                  className="mt-0.5 size-4.5 shrink-0 text-teal-300"
                  aria-hidden="true"
                />
                <span>
                  {siteConfig.contact.address}
                  <br />
                  CVR {siteConfig.contact.cvr}
                </span>
              </p>
            </div>

            <CookiePreferencesButton dict={dict} />

            <Link
              href={pageHref("privacy", locale)}
              className="group inline-flex w-fit items-center gap-2 text-sm text-ink-100/75 transition-colors hover:text-teal-300"
            >
              <Info className="size-4" aria-hidden="true" />
              {dict.footer.privacyLink}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-100/60">
            {dict.footer.rights.replace("{year}", String(year))}
          </p>
          <p className="text-xs text-ink-100/45">NOVA PRIME SERVICES ApS</p>
        </div>
      </div>
    </footer>
  );
}
