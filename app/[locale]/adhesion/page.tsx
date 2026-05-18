import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Heart } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ButtonLink } from "@/components/ui/button";
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
    <PageShell
      kicker={t("Home.support.kicker")}
      title={t("Nav.join")}
    >
      <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
        {t("Home.support.body")}
      </p>
      <div className="mt-8">
        <ButtonLink
          href={site.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="donate"
          size="lg"
        >
          <Heart className="size-4" aria-hidden />
          {t("Nav.join")}
        </ButtonLink>
        <p className="mt-4 text-sm text-ink-faint">
          {t("Home.support.note")}
        </p>
      </div>
    </PageShell>
  );
}
