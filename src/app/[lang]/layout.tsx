import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import {
  isLocale,
  localeHtmlLang,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/lib/site";
import { LangProvider } from "@/components/providers/lang-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-fraunces",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1b2f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/icon.png", sizes: "512x512" }],
  },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: true, email: true },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={localeHtmlLang[locale]}
      className={`${manrope.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LangProvider lang={locale}>
          <a
            href="#main-content"
            className="sr-only z-[100] rounded-full bg-brand-800 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            {dict.nav.skipToContent}
          </a>
          <ScrollProgress />
          <Header dict={dict} />
          <main id="main-content">{children}</main>
            <Footer dict={dict} locale={locale} />
          <BackToTop dict={dict} />
          <CookieConsent dict={dict} />
        </LangProvider>
      </body>
    </html>
  );
}
