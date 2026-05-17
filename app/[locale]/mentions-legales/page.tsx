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
  const t = useTranslations();
  return (
    <PageShell title={t("Footer.legal")}>
      <p className="max-w-2xl leading-relaxed text-ink-soft">
        {site.longName} — association loi 1901. Contact :{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-teal hover:text-ochre"
        >
          {site.email}
        </a>
        .
      </p>
      <p className="mt-6 text-sm text-ink-faint">{t("Common.comingSoon")}</p>
    </PageShell>
  );
}
