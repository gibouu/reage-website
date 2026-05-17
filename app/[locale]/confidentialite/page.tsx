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
    <PageShell title={t("Footer.privacy")}>
      <p className="max-w-2xl leading-relaxed text-ink-soft">
        Les paiements (dons, adhésions, billetterie) sont gérés directement par
        HelloAsso ; aucune donnée de paiement ne transite par ce site.
      </p>
      <p className="mt-6 text-sm text-ink-faint">{t("Common.comingSoon")}</p>
    </PageShell>
  );
}
