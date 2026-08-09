"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/auth-card";
import PasswordField from "@/components/auth/password-field";
import { createClient } from "@/lib/supabase/client";

const ResetPassword = () => {
  const t = useTranslations("ResetPassword");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isVerifying, setIsVerifying] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    const verify = async () => {
      const supabase = createClient();

      if (tokenHash && type === "recovery") {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          type: "recovery",
          token_hash: tokenHash,
        });
        setSessionReady(!verifyError);
        if (verifyError) setError(t("missingToken"));
      } else {
        const { data } = await supabase.auth.getSession();
        setSessionReady(!!data.session);
        if (!data.session) setError(t("missingToken"));
      }

      setIsVerifying(false);
    };

    verify();
  }, [searchParams, t]);

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
    const { error: resetError } = await supabase.auth.updateUser({
      password,
    });
    setIsSubmitting(false);

    if (resetError) {
      setError(resetError.message ?? t("genericError"));
      return;
    }

    router.push("/signin");
  };

  if (isVerifying) {
    return (
      <AuthCard
        eyebrow={t("badge")}
        title={t("heading")}
        subtitle={t("subheading")}
      >
        <p className="text-sm text-foreground-muted">{t("verifying")}</p>
      </AuthCard>
    );
  }

  if (!sessionReady) {
    return (
      <AuthCard
        eyebrow={t("badge")}
        title={t("heading")}
        subtitle={t("subheading")}
      >
        <p className="text-sm text-danger">{error ?? t("missingToken")}</p>
      </AuthCard>
    );
  }

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
