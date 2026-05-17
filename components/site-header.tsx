"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Heart } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { LinkedInIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const tLang = useTranslations("Lang");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

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
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={site.name}
        >
          <span className="grid size-8 place-items-center rounded-md bg-teal text-bone transition-colors group-hover:bg-ochre">
            <span className="font-display text-lg leading-none">R</span>
          </span>
          <span className="font-display text-2xl tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;
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
            type="button"
            className="rounded-full p-2 text-ink lg:hidden"
            aria-label={mobileOpen ? t("close") : t("menu")}
            aria-expanded={mobileOpen}
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
        <div className="border-t border-line bg-bone lg:hidden">
          <nav
            className="container-page flex flex-col py-4"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
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
