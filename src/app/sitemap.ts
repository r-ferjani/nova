import type { MetadataRoute } from "next";
import { serviceOrder, servicePaths } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

type SitemapEntry = {
  daPath: string;
  enPath: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const entries: SitemapEntry[] = [
    {
      daPath: "/",
      enPath: "/en/",
      priority: 1.0,
      changeFrequency: "monthly",
    },
    ...serviceOrder.map((key) => ({
      daPath: servicePaths[key].da,
      enPath: servicePaths[key].en,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    {
      daPath: "/privatlivspolitik/",
      enPath: "/en/privacy-policy/",
      priority: 0.4,
      changeFrequency: "yearly" as const,
    },
  ];

  return entries.map(({ daPath, enPath, priority, changeFrequency }) => ({
    url: `${base}${daPath}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        da: `${base}${daPath}`,
        en: `${base}${enPath}`,
        "x-default": `${base}${daPath}`,
      },
    },
  }));
}
