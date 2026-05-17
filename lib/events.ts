export type EventType = "afterwork" | "picnic" | "ramadan";

export interface SiteEvent {
  id: string;
  type: EventType;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Optional place; shown as-is (proper noun, not translated). */
  location?: string;
}

// Concrete-dated events. After-works fall on a late-month Tuesday; the Ramadan
// dinner date is an approximation until confirmed each year.
export const events: SiteEvent[] = [
  {
    id: "aw-2026-04-29",
    type: "afterwork",
    date: "2026-04-29",
    location: "Grande Mosquée de Paris",
  },
  { id: "picnic-2026-07-12", type: "picnic", date: "2026-07-12", location: "Paris" },
  { id: "aw-2026-09-29", type: "afterwork", date: "2026-09-29" },
  { id: "ramadan-2027-02-13", type: "ramadan", date: "2027-02-13" },
  { id: "aw-2027-01-26", type: "afterwork", date: "2027-01-26" },
  { id: "aw-2027-04-27", type: "afterwork", date: "2027-04-27" },
];

export function sortedEvents(): SiteEvent[] {
  return [...events].sort((a, b) => a.date.localeCompare(b.date));
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
