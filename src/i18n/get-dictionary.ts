import { dictionaries, type Dictionary } from "./dictionaries";
import { defaultLocale, isLocale } from "./config";

export function getDictionary(locale: string | undefined | null): Dictionary {
  return isLocale(locale) ? dictionaries[locale] : dictionaries[defaultLocale];
}

export { dictionaries, type Dictionary };
