import { cn } from "@/lib/utils";

// Static export with basePath: next/image (unoptimized) does not prefix the
// basePath onto a public-folder src, so we use a plain <img> and prefix it
// ourselves from NEXT_PUBLIC_BASE_PATH (inlined at build time).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Logo({
  variant = "default",
  className,
  priority = false,
}: {
  variant?: "default" | "light";
  className?: string;
  priority?: boolean;
}) {
  const file = variant === "light" ? "/logo-white.png" : "/logo.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${BASE}${file}`}
      alt="REAGE"
      width={354}
      height={166}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("h-9 w-auto", className)}
    />
  );
}
