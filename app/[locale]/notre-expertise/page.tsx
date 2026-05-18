import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Users, GraduationCap, Mic, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Link } from "@/i18n/navigation";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("ExpertisePage");
  const cards = [
    { key: "groups", href: "/notre-expertise/groupes", Icon: Users },
    {
      key: "universities",
      href: "/notre-expertise/reseau-universitaire",
      Icon: GraduationCap,
    },
    { key: "formation", href: "/notre-expertise/formation", Icon: Mic },
  ] as const;

  return (
    <PageShell kicker={t("kicker")} title={t("title")}>
      <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
        {t("intro")}
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map(({ key, href, Icon }) => (
          <Link
            key={key}
            href={href}
            className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-teal-tint text-teal transition-colors group-hover:bg-teal group-hover:text-bone">
              <Icon className="size-5" aria-hidden />
            </span>
            <h2 className="mt-6 font-display text-xl text-ink">
              {t(`${key}Title`)}
            </h2>
            <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
              {t(`${key}Body`)}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors group-hover:text-ochre">
              {t("cta")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
