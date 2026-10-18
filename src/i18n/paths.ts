import { pagePaths, servicePaths, type Locale, type PageKey, type ServiceKey } from "./config";

export function pageHref(key: PageKey, locale: Locale): string {
  return pagePaths[key][locale];
}

export function serviceHref(key: ServiceKey, locale: Locale): string {
  return servicePaths[key][locale];
}

export { pagePaths, servicePaths };
