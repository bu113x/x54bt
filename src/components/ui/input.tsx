import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Base text input. Deliberately unopinionated about labels/errors — compose
 * those in the form components that use it (e.g. auth/sign-in-form.tsx),
 * so this stays reusable for anything from an email field to an amount
 * field in the deposit flow.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-[10px] border border-border-strong bg-transparent px-4 text-sm text-foreground placeholder:text-foreground-muted transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
