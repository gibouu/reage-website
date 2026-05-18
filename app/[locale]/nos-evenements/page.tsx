import { getTranslations, setRequestLocale } from "next-intl/server";
import { Moon, Users, Trees, MapPin, CalendarClock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { getPublishedEvents, pickT } from "@/lib/supabase/queries";
import { eventKind, isPast, formatEventDate } from "@/lib/events";

export const dynamic = "force-dynamic";

const ICON = {
  afterwork: Users,
  picnic: Trees,
  ramadan: Moon,
  default: CalendarClock,
} as const;

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations("EventsPage");
  const events = await getPublishedEvents();
  const upcoming = events.filter((e) => !isPast(e.date_start));
  const past = events.filter((e) => isPast(e.date_start)).reverse();

  const Card = ({
    e,
    pastEvent,
  }: {
    e: (typeof events)[number];
    pastEvent: boolean;
  }) => {
    const Icon = ICON[eventKind(e.slug)];
    const c = pickT(e.translations, locale);
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
        <h3 className="mt-6 font-display text-xl text-ink">{c.title}</h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ochre">
          <CalendarClock className="size-4" aria-hidden />
          {formatEventDate(e.date_start, locale)}
        </p>
        {e.location && (
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-faint">
            <MapPin className="size-3.5" aria-hidden />
            {e.location}
          </p>
        )}
        {c.body && (
          <p className="mt-3 leading-relaxed text-ink-soft">{c.body}</p>
        )}
        {e.helloasso_ticket_url && (
          <a
            href={e.helloasso_ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-teal hover:text-ochre"
          >
            {t("register")}
          </a>
        )}
      </article>
    );
  };

  return (
    <PageShell kicker={t("kicker")} title={t("title")}>
      <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
        {t("intro")}
      </p>

      {upcoming.length > 0 && (
        <>
          <h2 className="mt-14 font-display text-2xl text-ink">
            {t("upcomingTitle")}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <Card key={e.id} e={e} pastEvent={false} />
            ))}
          </div>
        </>
      )}

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

      {events.length === 0 && (
        <p className="mt-10 text-ink-soft">{t("dynamicNote")}</p>
      )}
    </PageShell>
  );
}
