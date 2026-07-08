import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-surface-elevated text-foreground-muted",
        primary: "bg-primary/15 text-primary",
        success: "bg-success/15 text-success",
        danger: "bg-danger/15 text-danger",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Status pill. `success`/`danger` map to the same tokens used for price
 * movement (--color-success/--color-danger), so a "confirmed" deposit
 * badge and a "+2.3%" price both read as the same visual language.
 *
 * Suggested mapping for transaction/KYC states:
 *   pending    -> neutral
 *   confirmed  -> success
 *   failed     -> danger
 *   verified   -> success
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
