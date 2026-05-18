import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Mic, Briefcase, LineChart } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("Formation");
  const programs = [
    { n: "1", Icon: Mic },
    { n: "2", Icon: Briefcase },
    { n: "3", Icon: LineChart },
  ] as const;
  return (
    <PageShell title={t("title")}>
      <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
        {t("intro")}
      </p>

      <h2 className="mt-16 font-display text-2xl text-ink">
        {t("programsTitle")}
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {programs.map(({ n, Icon }) => (
          <div
            key={n}
            className="rounded-[var(--radius-card)] border border-line bg-paper p-8"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-teal-tint text-teal">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-6 font-display text-xl text-ink">
              {t(`p${n}Title`)}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {t(`p${n}Body`)}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-ink-faint">{t("note")}</p>
    </PageShell>
  );
}
