"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/auth-card";
import PasswordField from "@/components/auth/password-field";
import { createClient } from "@/lib/supabase/client";

const ResetPassword = () => {
  const t = useTranslations("ResetPassword");
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.updateUser({ password });
    setIsSubmitting(false);

    if (resetError) {
      setError(resetError.message ?? t("genericError"));
      return;
    }

    router.push("/sign-in");
  };

  return (
    <AuthCard
      eyebrow={t("badge")}
      title={t("heading")}
      subtitle={t("subheading")}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <PasswordField
          id="password"
          name="password"
          label={t("passwordLabel")}
          placeholder={t("passwordPlaceholder")}
          autoComplete="new-password"
          required
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label={t("confirmPasswordLabel")}
          placeholder={t("confirmPasswordPlaceholder")}
          autoComplete="new-password"
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

export default ResetPassword;
