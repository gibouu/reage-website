import Image from "next/image";
import { cn } from "@/lib/utils";

// REAGE wordmark. `default` is the colour logo on a transparent background
// (blends with the warm "bone" surface); `light` is the all-white version
// used on dark teal panels.
export function Logo({
  variant = "default",
  className,
  priority = false,
}: {
  variant?: "default" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={variant === "light" ? "/logo-white.png" : "/logo.png"}
      alt="REAGE"
      width={354}
      height={166}
      priority={priority}
      className={cn("h-9 w-auto", className)}
    />
  );
}
