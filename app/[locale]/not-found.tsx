import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations();
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-7xl text-teal">404</p>
        <h1 className="mt-4 font-display text-3xl text-ink">
          {t("NotFound.title")}
        </h1>
        <p className="mt-3 text-ink-soft">{t("NotFound.body")}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-teal px-6 py-3 font-medium text-bone transition-colors hover:bg-teal-dark"
        >
          {t("Common.backHome")}
        </Link>
      </div>
    </section>
  );
}
