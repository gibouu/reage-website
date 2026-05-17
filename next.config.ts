import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Static export for GitHub Pages. No server: middleware/redirects/image
// optimization are unavailable (handled via a static root redirect and
// unoptimized images). basePath is set for the project-pages subpath
// (https://<user>.github.io/<repo>) via NEXT_PUBLIC_BASE_PATH at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  devIndicators: false,
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
