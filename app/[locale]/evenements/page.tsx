import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Moon, Users, Trees, MapPin, CalendarClock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { sortedEvents, isPast, formatEventDate, type EventType } from "@/lib/events";

const ICON: Record<EventType, typeof Users> = {
  afterwork: Users,
  picnic: Trees,
  ramadan: Moon,
};

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content locale={locale} />;
}

function Content({ locale }: { locale: string }) {
  const t = useTranslations("EventsPage");
  const all = sortedEvents();
  const upcoming = all.filter((e) => !isPast(e.date));
  const past = all.filter((e) => isPast(e.date)).reverse();

  const Card = ({
    e,
    pastEvent,
  }: {
    e: (typeof all)[number];
    pastEvent: boolean;
  }) => {
    const Icon = ICON[e.type];
    return (
      <article className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7">
        <div className="flex items-center justify-between">
          <span className="grid size-12 place-items-center rounded-2xl bg-teal-tint text-teal">
            <Icon className="size-5" aria-hidden />
          </span>
          <span
            className={
              pastEvent
                ? "rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-faint"
                : "rounded-full bg-ochre/15 px-3 py-1 text-xs font-medium text-ochre"
            }
          >
            {pastEvent ? t("past") : t("upcoming")}
          </span>
        </div>
        <h3 className="mt-6 font-display text-xl text-ink">
          {t(`${e.type}Title`)}
        </h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ochre">
          <CalendarClock className="size-4" aria-hidden />
          {formatEventDate(e.date, locale)}
        </p>
        {e.location && (
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-faint">
            <MapPin className="size-3.5" aria-hidden />
            {e.location}
          </p>
        )}
        <p className="mt-3 leading-relaxed text-ink-soft">
          {t(`${e.type}Body`)}
        </p>
      </article>
    );
  };

  return (
    <PageShell kicker={t("kicker")} title={t("title")}>
      <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
        {t("intro")}
      </p>

      <h2 className="mt-14 font-display text-2xl text-ink">
        {t("upcomingTitle")}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((e) => (
          <Card key={e.id} e={e} pastEvent={false} />
        ))}
      </div>

      {past.length > 0 && (
        <>
          <h2 className="mt-16 font-display text-2xl text-ink">
            {t("pastTitle")}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => (
              <Card key={e.id} e={e} pastEvent />
            ))}
          </div>
        </>
      )}

      <p className="mt-10 text-sm text-ink-faint">{t("dynamicNote")}</p>
    </PageShell>
  );
}
