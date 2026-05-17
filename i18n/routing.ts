import { defineRouting } from "next-intl/routing";

// REAGE supports five locales. French is the default and the source of truth;
// every other locale falls back to French for any missing message (see request.ts).
// `kab` = Kabyle in Latin script (everyday-readable). `kab-Tfng` = Kabyle in
// Tifinagh script (preservation). Only Arabic is right-to-left.
export const routing = defineRouting({
  locales: ["fr", "en", "ar", "kab", "kab-Tfng"] as const,
  defaultLocale: "fr",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const localeMeta: Record<
  Locale,
  { label: string; native: string; dir: "ltr" | "rtl"; script?: "tifinagh" }
> = {
  fr: { label: "Français", native: "Français", dir: "ltr" },
  en: { label: "English", native: "English", dir: "ltr" },
  ar: { label: "Arabic", native: "العربية", dir: "rtl" },
  kab: { label: "Taqbaylit (Latin)", native: "Taqbaylit", dir: "ltr" },
  "kab-Tfng": {
    label: "Taqbaylit (Tifinagh)",
    native: "ⵜⴰⵇⴱⴰⵢⵍⵉⵜ",
    dir: "ltr",
    script: "tifinagh",
  },
};
