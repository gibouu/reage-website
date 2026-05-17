"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search, GraduationCap, MapPin } from "lucide-react";
import { universities, site } from "@/lib/site";

export function UniversitiesList() {
  const t = useTranslations("UniversitiesPage");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return universities;
    return universities.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.city.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <div>
      <div className="relative max-w-md">
        <Search
          className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
          aria-hidden
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="w-full rounded-full border border-line bg-paper py-3 ps-11 pe-4 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-teal/40"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-ink-soft">{t("empty")}</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((u) => (
            <article
              key={u.name}
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-6"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-teal-tint text-teal">
                <GraduationCap className="size-5" aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-lg text-ink">{u.name}</h2>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-faint">
                <MapPin className="size-3.5" aria-hidden />
                {u.city}
              </p>
              <p className="mt-4 flex-1 text-sm text-ink-soft">
                {"created" in u && u.created
                  ? `${t("createdLabel")} ${u.created}`
                  : t("soon")}
              </p>
              <a
                href={site.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-ochre"
              >
                {t("cta")}
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
