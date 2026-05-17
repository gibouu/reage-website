import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the `middleware` convention to `proxy`. next-intl's
// locale-negotiation handler is wrapped here under the new convention.
const handle = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handle(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
