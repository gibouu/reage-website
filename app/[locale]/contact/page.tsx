import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Mail } from "lucide-react";
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
  const t = useTranslations("Contact");
  return (
    <PageShell title={t("title")}>
      <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
        {t("body")}
      </p>
      <a
        href={`mailto:${site.email}`}
        className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-paper px-6 py-5 transition-colors hover:border-teal/40"
      >
        <span className="grid size-10 place-items-center rounded-xl bg-teal-tint text-teal">
          <Mail className="size-5" aria-hidden />
        </span>
        <span>
          <span className="block text-xs uppercase tracking-wider text-ink-faint">
            {t("emailLabel")}
          </span>
          <span className="text-lg font-medium text-ink">{site.email}</span>
        </span>
      </a>
    </PageShell>
  );
}
