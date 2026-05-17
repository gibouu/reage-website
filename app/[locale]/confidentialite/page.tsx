import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { site } from "@/lib/site";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("Legal");
  const sections = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9"];
  return (
    <PageShell title={t("privacyTitle")}>
      <p className="max-w-2xl leading-relaxed text-ink-soft">
        {t("privacyIntro")}
      </p>
      <div className="mt-12 max-w-2xl space-y-10">
        {sections.map((s) => (
          <section key={s}>
            <h2 className="font-display text-xl text-ink">{t(`${s}Title`)}</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">
              {t(`${s}Body`, { email: site.email })}
            </p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
