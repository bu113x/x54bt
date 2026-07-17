import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className="text-sm font-medium text-foreground-muted"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={`w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/60 outline-none transition-colors focus:border-success/60 focus:ring-2 focus:ring-success/20 ${
            error
              ? "border-danger/60 focus:border-danger/60 focus:ring-danger/20"
              : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
