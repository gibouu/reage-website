import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Link } from "@/i18n/navigation";
import { getPublishedArticles, pickT } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations("Home.news");
  const articles = await getPublishedArticles();

  return (
    <PageShell title={t("title")}>
      {articles.length === 0 ? (
        <p className="text-lg text-ink-soft">{t("empty")}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => {
            const c = pickT(a.translations, locale);
            const date = a.published_at
              ? new Date(a.published_at).toLocaleDateString(
                  locale === "ar" ? "ar" : "fr-FR",
                  { day: "numeric", month: "long", year: "numeric" },
                )
              : null;
            return (
              <Link
                key={a.id}
                href={`/actualites/${a.slug}`}
                className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-colors hover:border-teal/30"
              >
                {date && (
                  <span className="text-xs uppercase tracking-wider text-ink-faint">
                    {date}
                  </span>
                )}
                <h2 className="mt-2 font-display text-xl text-ink">
                  {c.title}
                </h2>
                {c.summary && (
                  <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                    {c.summary}
                  </p>
                )}
                {a.author_name && (
                  <span className="mt-4 text-sm text-ink-faint">
                    {a.author_name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
