import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/json-ld";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesSection } from "@/components/sections/services-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProcessSection } from "@/components/sections/process-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ContactSection } from "@/components/sections/contact-section";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);

  return pageMetadata({
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    daPath: "/",
    enPath: "/en/",
  });
}

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  const { service } = await searchParams;
  const preselectedService =
    typeof service === "string" && service.length > 0 ? service : null;

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema(locale)} />
      <HeroSection dict={dict} />
      <TrustStrip dict={dict} />
      <ServicesSection dict={dict} locale={locale} />
      <BenefitsSection dict={dict} />
      <AboutSection dict={dict} locale={locale} />
      <ProcessSection dict={dict} locale={locale} />
      <CtaSection dict={dict} locale={locale} />
      <ContactSection
        dict={dict}
        locale={locale}
        preselectedService={preselectedService}
      />
    </>
  );
}
