import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

// Recursively layer a locale's messages on top of the French defaults so any
// untranslated key transparently falls back to French.
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    out[key] =
      b && o && typeof b === "object" && typeof o === "object" && !Array.isArray(o)
        ? deepMerge(b as Messages, o as Messages)
        : o;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const fr = (await import("../messages/fr.json")).default as Messages;
  const messages =
    locale === "fr"
      ? fr
      : deepMerge(
          fr,
          (await import(`../messages/${locale}.json`)).default as Messages,
        );

  return { locale, messages };
});
