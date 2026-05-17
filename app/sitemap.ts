import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

// Deployed origin (incl. project-pages subpath). Override with
// NEXT_PUBLIC_SITE_URL once a custom domain (reage.org) is attached.
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://gibouu.github.io/reage-website";
const paths = [
  "",
  "/presentation",
  "/formation",
  "/evenements",
  "/universites",
  "/groupes",
  "/actualites",
  "/adhesion",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
        ),
      },
    })),
  );
}
