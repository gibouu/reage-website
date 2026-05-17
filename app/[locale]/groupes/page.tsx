import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Rocket, TrendingUp, GraduationCap, Sprout, Landmark } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Link } from "@/i18n/navigation";
import { groups } from "@/lib/site";

const ICON = {
  entrepreneurship: Rocket,
  investing: TrendingUp,
  training: GraduationCap,
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
          const href = "href" in g ? g.href : undefined;
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
                {"created" in g && g.created
                  ? `${t("createdLabel")} ${g.created}`
                  : t("soon")}
              </p>
              {href && (
                <Link
                  href={href}
                  className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-ochre"
                >
                  {t("view")}
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
