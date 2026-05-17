import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { UniversitiesList } from "@/components/universities-list";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("UniversitiesPage");
  return (
    <PageShell kicker={t("kicker")} title={t("title")}>
      <p className="mb-10 max-w-3xl text-xl leading-relaxed text-ink-soft">
        {t("intro")}
      </p>
      <UniversitiesList />
    </PageShell>
  );
}
