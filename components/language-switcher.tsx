"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Globe, Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeMeta, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ label }: { label: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <Globe className="size-4" aria-hidden />
        <span className="hidden sm:inline">{localeMeta[locale].native}</span>
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-line bg-paper py-1.5 shadow-[0_24px_48px_-20px_rgba(28,27,23,0.35)] reveal"
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setOpen(false);
                    router.replace(pathname, { locale: l });
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-start text-sm transition-colors hover:bg-teal-tint",
                    active ? "text-teal" : "text-ink-soft",
                  )}
                >
                  <span>
                    <span className="font-medium text-ink">
                      {localeMeta[l].native}
                    </span>
                    <span className="ms-2 text-xs text-ink-faint">
                      {localeMeta[l].label}
                    </span>
                  </span>
                  {active && <Check className="size-4" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
