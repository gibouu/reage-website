import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { getArticleBySlug, pickT } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function Page(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const article = await getArticleBySlug(slug);
  if (!article || article.status !== "published") notFound();

  const c = pickT(article.translations, locale);
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString(
        locale === "ar" ? "ar" : "fr-FR",
        { day: "numeric", month: "long", year: "numeric" },
      )
    : null;

  return (
    <PageShell kicker={date ?? undefined} title={c.title ?? slug}>
      {article.author_name && (
        <p className="text-sm text-ink-faint">{article.author_name}</p>
      )}
      {c.body && (
        <div className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-ink-soft">
          {c.body}
        </div>
      )}
    </PageShell>
  );
}
