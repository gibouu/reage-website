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
  return (
    <PageShell title={t("privacyTitle")}>
      <p className="max-w-2xl leading-relaxed text-ink-soft">
        {t("privacyBody", { email: site.email })}
      </p>
    </PageShell>
  );
}
