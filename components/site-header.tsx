"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setOpenMenu(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

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
          ref={navRef}
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            if (item.children) {
              const open = openMenu === item.key;
              return (
                <div key={item.key} className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={open}
                    onClick={() =>
                      setOpenMenu((v) => (v === item.key ? null : item.key))
                    }
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors",
                      active || open
                        ? "text-teal"
                        : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                    )}
                  >
                    {t(item.key)}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform",
                        open && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  {open && (
                    <div
                      role="menu"
                      className="absolute start-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-paper py-1.5 shadow-[0_24px_48px_-20px_rgba(28,27,23,0.35)] reveal"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-teal-tint hover:text-teal"
                        >
                          {t(child.key)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
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
        <div className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-line bg-bone lg:hidden">
          <nav
            className="container-page flex flex-col py-4"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <div key={item.key}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-ink/5"
                >
                  {t(item.key)}
                </Link>
                {item.children && (
                  <div className="ms-3 border-s border-line ps-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 text-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                      >
                        {t(child.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
