import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    // Old slugs → new slugs, locale-aware (locale is the first path segment).
    const map: [string, string][] = [
      ["presentation", "nous-decouvrir"],
      ["evenements", "nos-evenements"],
      ["groupes", "notre-expertise/groupes"],
      ["universites", "notre-expertise/reseau-universitaire"],
      ["formation", "notre-expertise/formation"],
    ];
    return [
      ...map.map(([from, to]) => ({
        source: `/:locale/${from}`,
        destination: `/:locale/${to}`,
        permanent: true,
      })),
      {
        source: "/:locale/actualites/:path*",
        destination: "/:locale/nos-actualites/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
