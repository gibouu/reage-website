import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Fraunces,
  Hanken_Grotesk,
  Noto_Sans_Arabic,
  Noto_Sans_Tifinagh,
} from "next/font/google";
import { routing, localeMeta, type Locale } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});
const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
});
const notoTifinagh = Noto_Sans_Tifinagh({
  subsets: ["tifinagh"],
  weight: ["400"],
  display: "swap",
  variable: "--font-tifinagh",
});

// Static export: only the known locales are generated; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    metadataBase: new URL("https://reage.org"),
    applicationName: "REAGE",
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: "REAGE",
      title,
      description,
      locale,
      url: `/${locale}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const meta = localeMeta[locale as Locale];
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  return (
    <html
      lang={locale}
      dir={meta.dir}
      data-script={meta.script ?? "latin"}
      className={`${fraunces.variable} ${hanken.variable} ${notoArabic.variable} ${notoTifinagh.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-teal focus:px-5 focus:py-3 focus:text-bone"
          >
            {tCommon("skip")}
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1">
            {props.children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
