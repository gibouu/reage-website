import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Users,
  Rocket,
  GraduationCap,
  ArrowRight,
  Newspaper,
  Heart,
  Star,
  Trees,
  Moon,
  MapPin,
  CalendarClock,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { partners, site } from "@/lib/site";
import { eventKind, isPast, formatEventDate, type EventKind } from "@/lib/events";
import {
  getPublishedEvents,
  getPublishedArticles,
  pickT,
} from "@/lib/supabase/queries";
import type { Event, Article } from "@/lib/supabase/types";

// Reads live events/articles from Supabase per request — must not be
// statically prerendered at build time.
export const dynamic = "force-dynamic";

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const [events, articles] = await Promise.all([
    getPublishedEvents(),
    getPublishedArticles(),
  ]);
  const upcoming = events.filter((e) => !isPast(e.date_start)).slice(0, 6);
  return (
    <>
      <Hero />
      <About />
      <WhatWeDo />
      <LatestEvents events={upcoming} locale={locale} />
      <LatestNews articles={articles.slice(0, 3)} locale={locale} />
      <Support />
      <Partners />
    </>
  );
}

function Hero() {
  const t = useTranslations("Home.hero");
  const tNav = useTranslations("Nav");
  const tM = useTranslations("Home.members");
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(120% 90% at 85% -10%, rgba(14,77,73,0.10), transparent 55%), radial-gradient(80% 70% at 5% 110%, rgba(194,105,31,0.10), transparent 60%)",
        }}
      />
      <div className="container-page grid items-center gap-12 pt-20 pb-24 md:pt-28 md:pb-32 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p
            className="reveal text-sm font-medium uppercase tracking-[0.18em] text-ochre"
            style={{ animationDelay: "0ms" }}
          >
            {t("kicker")}
          </p>
          <h1
            className="reveal mt-5 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
            style={{ animationDelay: "90ms" }}
          >
            {t("title")}
          </h1>
          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "180ms" }}
          >
            {t("subtitle")}
          </p>
          <div
            className="reveal mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "270ms" }}
          >
            <ButtonLink
              href={site.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="donate"
              size="lg"
            >
              <Heart className="size-4" aria-hidden />
              {tNav("join")}
            </ButtonLink>
          </div>
        </div>

        <div
          className="reveal relative overflow-hidden rounded-[2rem] border border-line bg-teal p-8 md:p-10"
          style={{ animationDelay: "200ms" }}
        >
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(155deg, #0e4d49 0%, #0a3a37 60%, #123f3b 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.14]"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(135deg, #f4efe6 25%, transparent 25%), linear-gradient(225deg, #f4efe6 25%, transparent 25%)",
              backgroundSize: "28px 20px",
            }}
          />
          <div className="relative">
            <Logo variant="light" className="h-8" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-bone/80">
              {tM("title")}
            </p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/25 bg-white/10 p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <Users className="size-5 text-ochre" aria-hidden />
                  <h2 className="font-display text-xl font-semibold text-white">
                    {tM("free.title")}
                  </h2>
                </div>
                <p className="mt-2.5 text-[0.95rem] font-medium leading-relaxed text-white/90">
                  {tM("free.body")}
                </p>
              </div>
              <div className="rounded-2xl border border-ochre/60 bg-ochre/15 p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <Star className="size-5 text-ochre" aria-hidden />
                  <h2 className="font-display text-xl font-semibold text-white">
                    {tM("paid.title")}
                  </h2>
                </div>
                <p className="mt-2.5 text-[0.95rem] font-medium leading-relaxed text-white/90">
                  {tM("paid.body")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="amazigh-rule" aria-hidden />
    </section>
  );
}

function About() {
  const t = useTranslations("Home.about");
  return (
    <section className="container-page py-24">
      <div className="grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:gap-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-ochre">
            {t("kicker")}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-ink-soft">{t("body")}</p>
          <Link
            href="/nous-decouvrir"
            className="mt-6 inline-flex items-center gap-2 font-medium text-teal transition-colors hover:text-ochre"
          >
            {t("link")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const t = useTranslations("Home.what");
  const cards = [
    { key: "network", Icon: Users },
    { key: "entrepreneurship", Icon: Rocket },
    { key: "training", Icon: GraduationCap },
  ] as const;
  return (
    <section className="bg-paper py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-ink-soft">{t("subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map(({ key, Icon }) => (
            <div
              key={key}
              className="group rounded-[var(--radius-card)] border border-line bg-bone p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-teal-tint text-teal transition-colors group-hover:bg-teal group-hover:text-bone">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-6 font-display text-xl text-ink">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {t(`${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const EVENT_ICON: Record<EventKind, typeof Users> = {
  afterwork: Users,
  picnic: Trees,
  ramadan: Moon,
  default: CalendarClock,
};

function LatestEvents({
  events,
  locale,
}: {
  events: Event[];
  locale: string;
}) {
  const t = useTranslations("Home.events");
  return (
    <section className="py-24">
      <div className="container-page">
        <SectionHead
          title={t("title")}
          subtitle={t("subtitle")}
          href="/nos-evenements"
          cta={t("all")}
        />
        {events.length === 0 ? (
          <EmptyState Icon={CalendarClock} label={t("empty")} />
        ) : (
          <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50%-9rem)] pb-4 [scrollbar-width:thin] sm:px-0">
            {events.map((e) => {
              const Icon = EVENT_ICON[eventKind(e.slug)];
              const c = pickT(e.translations, locale);
              return (
                <article
                  key={e.id}
                  className="flex w-72 shrink-0 snap-center flex-col rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:snap-start"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-teal-tint text-teal">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-ink">
                    {c.title}
                  </h3>
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
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                      {c.body}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function LatestNews({
  articles,
  locale,
}: {
  articles: Article[];
  locale: string;
}) {
  const t = useTranslations("Home.news");
  return (
    <section className="bg-paper py-24">
      <div className="container-page">
        <SectionHead
          title={t("title")}
          subtitle={t("subtitle")}
          href="/nos-actualites"
          cta={t("all")}
        />
        {articles.length === 0 ? (
          <EmptyState Icon={Newspaper} label={t("empty")} />
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {articles.map((a) => {
              const c = pickT(a.translations, locale);
              return (
                <Link
                  key={a.id}
                  href={`/nos-actualites/${a.slug}`}
                  className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-bone p-6 transition-colors hover:border-teal/30"
                >
                  <h3 className="font-display text-lg text-ink">{c.title}</h3>
                  {c.summary && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {c.summary}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal">
                    {t("all")}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function Support() {
  const t = useTranslations("Home.support");
  const tNav = useTranslations("Nav");
  return (
    <section className="container-page py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-teal px-8 py-16 text-bone md:px-16 md:py-20">
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(135deg, #f4efe6 25%, transparent 25%), linear-gradient(225deg, #f4efe6 25%, transparent 25%)",
            backgroundSize: "30px 22px",
          }}
        />
        <div className="relative max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-bone/80">
            {t("kicker")}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-bone/80">
            {t("body")}
          </p>
          <div className="mt-9">
            <ButtonLink
              href={site.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="donate"
              size="lg"
            >
              <Heart className="size-4" aria-hidden />
              {tNav("join")}
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-bone/60">{t("note")}</p>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const t = useTranslations("Home.partners");
  return (
    <section className="container-page pb-8">
      <div className="text-center">
        <h2 className="font-display text-2xl text-ink">{t("title")}</h2>
        <p className="mt-2 text-sm text-ink-soft">{t("subtitle")}</p>
      </div>
      <div className="marquee mt-10">
        <div className="marquee-track gap-x-12">
          {[...partners, ...partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
              aria-hidden={i >= partners.length}
              className="shrink-0 px-2 text-base font-medium tracking-wide whitespace-nowrap text-ink-faint transition-colors hover:text-teal"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- small shared building blocks --- */

function SectionHead({
  title,
  subtitle,
  href,
  cta,
}: {
  title: string;
  subtitle: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-lg text-ink-soft">{subtitle}</p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-ochre"
      >
        {cta}
        <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
      </Link>
    </div>
  );
}

function EmptyState({
  Icon,
  label,
}: {
  Icon: typeof Newspaper;
  label: string;
}) {
  return (
    <div className="mt-10 grid place-items-center rounded-[var(--radius-card)] border border-dashed border-line bg-paper/60 px-6 py-16 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-teal-tint text-teal">
        <Icon className="size-5" aria-hidden />
      </span>
      <p className="mt-4 text-ink-soft">{label}</p>
    </div>
  );
}
