"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Accessibility, X } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "reage:a11y:readable-font";

export function AccessibilityWidget() {
  const t = useTranslations("A11y");
  const [open, setOpen] = useState(false);
  const [readable, setReadable] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Sync initial state from the attribute the no-flash script already set.
  useEffect(() => {
    setReadable(
      document.documentElement.dataset.readableFont === "true",
    );
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  function toggleReadable(next: boolean) {
    setReadable(next);
    const root = document.documentElement;
    if (next) {
      root.dataset.readableFont = "true";
      localStorage.setItem(STORAGE_KEY, "1");
    } else {
      delete root.dataset.readableFont;
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <div className="fixed bottom-4 start-4 z-50 print:hidden">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={t("title")}
          className="mb-3 w-72 rounded-2xl border border-line bg-paper p-5 shadow-[0_24px_48px_-20px_rgba(28,27,23,0.4)]"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">{t("title")}</h2>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label={t("close")}
              className="rounded-full p-1.5 text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <label className="mt-4 flex cursor-pointer items-start justify-between gap-3">
            <span>
              <span className="block text-sm font-medium text-ink">
                {t("readableFont")}
              </span>
              <span className="mt-0.5 block text-xs text-ink-faint">
                {t("readableFontHint")}
              </span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={readable}
              onChange={(e) => toggleReadable(e.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-teal"
            />
          </label>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={t("button")}
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-full bg-teal text-bone shadow-[0_8px_24px_-8px_rgba(14,77,73,0.6)] transition-colors hover:bg-teal-dark",
        )}
      >
        <Accessibility className="size-6" aria-hidden />
      </button>
    </div>
  );
}
