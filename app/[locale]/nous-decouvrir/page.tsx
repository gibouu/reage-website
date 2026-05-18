import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { partners } from "@/lib/site";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("AboutPage");
  const sections = ["how", "board", "org", "history", "impact"] as const;
  return (
    <PageShell kicker={t("kicker")} title={t("title")}>
      <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
        {t("intro")}
      </p>
      <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
        {sections.map((s) => (
          <section key={s}>
            <h2 className="font-display text-2xl text-ink">
              {t(`${s}Title`)}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {t(`${s}Body`)}
            </p>
          </section>
        ))}
      </div>
      <div className="mt-16 border-t border-line pt-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {partners.map((p) => (
            <span key={p} className="text-sm text-ink-faint">
              {p}
            </span>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
