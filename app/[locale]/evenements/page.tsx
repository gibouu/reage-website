import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Moon, Users, Trees, MapPin, CalendarClock } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("EventsPage");
  const events = [
    { k: "iftar", Icon: Moon },
    { k: "afterwork", Icon: Users },
    { k: "picnic", Icon: Trees },
  ] as const;
  return (
    <PageShell kicker={t("kicker")} title={t("title")}>
      <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
        {t("intro")}
      </p>

      <h2 className="mt-14 font-display text-2xl text-ink">
        {t("recurringTitle")}
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {events.map(({ k, Icon }) => (
          <article
            key={k}
            className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-teal-tint text-teal">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-6 font-display text-xl text-ink">
              {t(`${k}Title`)}
            </h3>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ochre">
              <CalendarClock className="size-4" aria-hidden />
              {t(`${k}When`)}
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {t(`${k}Body`)}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-start gap-4 rounded-[var(--radius-card)] border border-teal/20 bg-teal-tint/50 p-6">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal text-bone">
          <MapPin className="size-5" aria-hidden />
        </span>
        <div>
          <h3 className="font-display text-lg text-ink">
            {t("highlightTitle")}
          </h3>
          <p className="mt-1 text-ink-soft">{t("highlightBody")}</p>
        </div>
      </div>

      <p className="mt-8 text-sm text-ink-faint">{t("dynamicNote")}</p>
    </PageShell>
  );
}
