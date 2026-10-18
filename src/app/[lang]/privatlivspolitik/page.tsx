import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { PrivacyContent } from "@/components/sections/privacy-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);

  return pageMetadata({
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
    daPath: "/privatlivspolitik/",
    enPath: "/en/privacy-policy/",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return <PrivacyContent dict={dict} locale={locale} />;
}
