"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormField from "./form-field";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <FormField
          ref={ref}
          id={id}
          label={label}
          error={error}
          type={visible ? "text" : "password"}
          className="pr-11"
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3.5 top-8.5 text-foreground-muted hover:text-foreground"
          tabIndex={-1}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
