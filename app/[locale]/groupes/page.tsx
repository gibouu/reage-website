import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Rocket, TrendingUp, Sprout, Landmark } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { groups } from "@/lib/site";

const ICON = {
  entrepreneurship: Rocket,
  investing: TrendingUp,
  agriculture: Sprout,
  finance: Landmark,
} as const;

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("GroupsPage");
  return (
    <PageShell kicker={t("kicker")} title={t("title")}>
      <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
        {t("intro")}
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {groups.map((g) => {
          const Icon = ICON[g.key as keyof typeof ICON];
          const created = "created" in g ? g.created : undefined;
          return (
            <article
              key={g.slug}
              id={g.slug}
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7 scroll-mt-24"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-teal-tint text-teal">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-6 font-display text-xl text-ink">
                {t(`${g.key}Title`)}
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                {t(`${g.key}Body`)}
              </p>
              <p className="mt-4 text-sm text-ink-faint">
                {created ? `${t("createdLabel")} ${created}` : t("soon")}
              </p>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
