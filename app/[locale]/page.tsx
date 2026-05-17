import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Users,
  Rocket,
  GraduationCap,
  ArrowRight,
  CalendarDays,
  Newspaper,
  Heart,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/button";
import { partners, site } from "@/lib/site";

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <About />
      <WhatWeDo />
      <LatestEvents />
      <LatestNews />
      <Support />
      <Partners />
    </>
  );
}

function Hero() {
  const t = useTranslations("Home.hero");
  const tNav = useTranslations("Nav");
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
          className="reveal relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-teal"
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
            className="absolute inset-0 opacity-[0.16]"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(135deg, #f4efe6 25%, transparent 25%), linear-gradient(225deg, #f4efe6 25%, transparent 25%)",
              backgroundSize: "28px 20px",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="font-display text-2xl text-bone">{site.name}</p>
            <p className="mt-1 text-sm text-bone/70">
              {site.longName} · {site.founded}
            </p>
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
            href="/presentation"
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

function LatestEvents() {
  const t = useTranslations("Home.events");
  // Events come from Supabase in Phase 3; until then show a graceful empty state.
  const events: never[] = [];
  return (
    <section className="container-page py-24">
      <SectionHead
        title={t("title")}
        subtitle={t("subtitle")}
        href="/evenements"
        cta={t("all")}
      />
      {events.length === 0 && (
        <EmptyState Icon={CalendarDays} label={t("empty")} />
      )}
    </section>
  );
}

function LatestNews() {
  const t = useTranslations("Home.news");
  const news: never[] = [];
  return (
    <section className="bg-paper py-24">
      <div className="container-page">
        <SectionHead
          title={t("title")}
          subtitle={t("subtitle")}
          href="/actualites"
          cta={t("all")}
        />
        {news.length === 0 && (
          <EmptyState Icon={Newspaper} label={t("empty")} />
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
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-ochre">
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
  Icon: typeof CalendarDays;
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
