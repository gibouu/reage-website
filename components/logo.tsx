import Image from "next/image";
import { cn } from "@/lib/utils";

// REAGE wordmark. The colour logo sits on a white chip (its source is an opaque
// JPEG) so it reads cleanly on the warm "bone" surfaces; the transparent white
// version is used on dark teal panels.
export function Logo({
  variant = "default",
  className,
  priority = false,
}: {
  variant?: "default" | "light";
  className?: string;
  priority?: boolean;
}) {
  if (variant === "light") {
    return (
      <Image
        src="/logo-white.png"
        alt="REAGE"
        width={354}
        height={166}
        priority={priority}
        className={cn("h-9 w-auto", className)}
      />
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-[0_1px_0_rgba(28,27,23,0.06)]",
        className,
      )}
    >
      <Image
        src="/logo.jpg"
        alt="REAGE"
        width={354}
        height={166}
        priority={priority}
        className="h-7 w-auto"
      />
    </span>
  );
}
