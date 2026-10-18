"use client";

import { CookieIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

/**
 * Opens the cookie-preferences panel. Decoupled from the panel itself via a
 * CustomEvent so the footer can stay a server component.
 */
export function CookiePreferencesButton({ dict }: { dict: Dictionary }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("nova:open-cookie-preferences"));
      }}
      className="group inline-flex w-fit items-center gap-2 text-sm text-ink-100/75 transition-colors hover:text-teal-300"
    >
      <CookieIcon className="size-4" aria-hidden="true" />
      {dict.footer.cookieLink}
    </button>
  );
}
