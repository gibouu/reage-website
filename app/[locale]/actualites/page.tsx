import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations();
  return (
    <PageShell title={t("Nav.news")}>
      <p className="text-lg text-ink-soft">{t("Home.news.empty")}</p>
    </PageShell>
  );
}
