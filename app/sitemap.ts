import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE = "https://reage.org";
const paths = [
  "",
  "/nous-decouvrir",
  "/nos-evenements",
  "/nos-actualites",
  "/notre-expertise",
  "/notre-expertise/groupes",
  "/notre-expertise/reseau-universitaire",
  "/notre-expertise/formation",
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
