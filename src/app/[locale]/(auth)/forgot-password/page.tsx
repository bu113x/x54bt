"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/auth-card";
import FormField from "@/components/auth/form-field";
import { createClient } from "@/lib/supabase/client";

const ForgotPassword = () => {
  const t = useTranslations("ForgotPassword");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: forgotError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/reset-password`,
      },
    );
    setIsSubmitting(false);

    if (forgotError) {
      setError(forgotError.message ?? t("genericError"));
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <AuthCard
        eyebrow={t("badge")}
        title={t("sentTitle")}
        subtitle={t("sentSubtitle")}
      >
        <Link
          href="/sign-in"
          className="text-sm font-medium text-success hover:underline"
        >
          {t("backToSignIn")}
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      eyebrow={t("badge")}
      title={t("heading")}
      subtitle={t("subheading")}
      footer={
        <span className="text-foreground-muted">
          {t("rememberPassword")}{" "}
          <Link
            href="/sign-in"
            className="font-medium text-success hover:underline"
          >
            {t("signIn")}
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField
          id="email"
          name="email"
          type="email"
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          required
        />

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("submitting") : t("cta")}
        </Button>
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;
