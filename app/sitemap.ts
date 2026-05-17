import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE = "https://reage.org";
const paths = [
  "",
  "/presentation",
  "/formation",
  "/evenements",
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
