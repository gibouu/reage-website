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
  const t = useTranslations("Presentation");
  return (
    <PageShell kicker={t("kicker")} title={t("title")}>
      <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
        {t("intro")}
      </p>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl text-ink">
            {t("missionTitle")}
          </h2>
          <p className="mt-3 text-ink-soft">{t("missionLead")}</p>
          <ul className="mt-4 space-y-3">
            {["mission1", "mission2", "mission3"].map((k) => (
              <li key={k} className="flex gap-3 text-ink-soft">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ochre" />
                {t(k)}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">
            {t("visionTitle")}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {t("visionBody")}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">
            {t("historyTitle")}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {t("historyBody")}
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink">
            {t("governanceTitle")}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {t("governanceBody")}
          </p>
        </section>
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
