"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/i18n/config";

const LangContext = createContext<Locale>(defaultLocale);

export function LangProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Locale {
  return useContext(LangContext);
}
