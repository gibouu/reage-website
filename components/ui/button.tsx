import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-full transition-all duration-200 ease-[var(--ease-out-soft)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2",
  {
    variants: {
      variant: {
        donate:
          "bg-ochre text-bone shadow-[0_8px_24px_-10px_rgba(194,105,31,0.7)] hover:bg-ochre-dark hover:-translate-y-0.5",
        primary:
          "bg-teal text-bone hover:bg-teal-dark hover:-translate-y-0.5",
        outline:
          "border border-teal/30 text-teal hover:bg-teal hover:text-bone",
        ghost: "text-ink hover:bg-ink/5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.95rem]",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = React.ComponentProps<"a"> &
  VariantProps<typeof button> & { asChild?: never };

export function ButtonLink({ className, variant, size, ...props }: Props) {
  return (
    <a className={cn(button({ variant, size }), className)} {...props} />
  );
}

export { button };
