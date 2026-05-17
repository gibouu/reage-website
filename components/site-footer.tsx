import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LinkedInIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { navItems, site } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-paper">
      <div className="amazigh-rule" aria-hidden />
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            {t("Footer.tagline")}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            {t("Footer.navTitle")}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems
              .filter((item) => item.key !== "home")
              .map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-ink-soft transition-colors hover:text-teal"
                  >
                    {t(`Nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            <li>
              <Link
                href="/contact"
                className="text-ink-soft transition-colors hover:text-teal"
              >
                {t("Nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            {t("Footer.contactTitle")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-teal"
              >
                <Mail className="size-4" aria-hidden />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-teal"
              >
                <LinkedInIcon className="size-4" />
                {t("Footer.linkedin")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.longName}. {t("Footer.rights")}
          </p>
          <div className="flex gap-5">
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-teal"
            >
              {t("Footer.legal")}
            </Link>
            <Link
              href="/confidentialite"
              className="transition-colors hover:text-teal"
            >
              {t("Footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
