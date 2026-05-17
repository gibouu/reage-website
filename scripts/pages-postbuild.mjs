// Post-build for GitHub Pages static export:
//  - .nojekyll so `_next/` assets are served (Pages would otherwise skip _*)
//  - root index.html + 404.html that redirect to the default locale, since
//    static export has no middleware to do the `/` -> `/fr` redirect.
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const target = `${base}/fr/`;

const redirectHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
    <title>REAGE</title>
    <script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
  </head>
  <body>
    <p>Redirection vers <a href="${target}">REAGE</a>…</p>
  </body>
</html>
`;

writeFileSync(join(OUT, ".nojekyll"), "");
writeFileSync(join(OUT, "index.html"), redirectHtml);
writeFileSync(join(OUT, "404.html"), redirectHtml);
console.log(`[pages-postbuild] wrote .nojekyll, index.html, 404.html -> ${target}`);
