import React from "react";

interface AuthCardProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const AuthCard = ({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center mt-10">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-success">
          {eyebrow}
        </span>
      )}
      <h1
        className="mt-4 text-3xl font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-sm text-foreground-muted">{subtitle}</p>
      )}

      <div className="mt-8">{children}</div>

      {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
    </div>
  );
};

export default AuthCard;
