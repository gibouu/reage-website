// Display helpers for DB-backed events. Content lives in Supabase
// (public.events); these only format/derive presentation bits.

export type EventKind = "afterwork" | "picnic" | "ramadan" | "default";

export function eventKind(slug: string): EventKind {
  if (slug.startsWith("aw-") || slug.includes("afterwork")) return "afterwork";
  if (slug.startsWith("picnic")) return "picnic";
  if (slug.startsWith("ramadan") || slug.includes("iftar")) return "ramadan";
  return "default";
}

export function isPast(date: string): boolean {
  return new Date(date).getTime() < Date.now();
}

const LOCALE_FMT: Record<string, string> = {
  fr: "fr-FR",
  en: "en-GB",
  ar: "ar",
  kab: "fr-FR",
  "kab-Tfng": "fr-FR",
};

export function formatEventDate(date: string, locale: string): string {
  const d = new Date(`${date}T00:00:00`);
  try {
    return new Intl.DateTimeFormat(LOCALE_FMT[locale] ?? "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return date;
  }
}
