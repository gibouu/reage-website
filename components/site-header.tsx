"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Heart } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { LinkedInIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const tLang = useTranslations("Lang");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  // Esc closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-bone/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4">
        <Link href="/" aria-label={site.name} className="shrink-0">
          <Logo priority />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  active
                    ? "text-teal"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={site.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden rounded-full p-2 text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink sm:inline-flex"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <LanguageSwitcher label={tLang("label")} />
          <ButtonLink
            href={site.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="donate"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Heart className="size-4" aria-hidden />
            {t("join")}
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="rounded-full p-2 text-ink lg:hidden"
            aria-label={mobileOpen ? t("close") : t("menu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-line bg-bone lg:hidden">
          <nav
            id="mobile-nav"
            className="container-page flex flex-col py-4"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="block rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-ink/5"
              >
                {t(item.key)}
              </Link>
            ))}
            <ButtonLink
              href={site.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="donate"
              size="md"
              className="mt-3"
            >
              <Heart className="size-4" aria-hidden />
              {t("join")}
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
