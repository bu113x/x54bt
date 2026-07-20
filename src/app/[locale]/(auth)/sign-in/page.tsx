"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/auth-card";
import FormField from "@/components/auth/form-field";
import PasswordField from "@/components/auth/password-field";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/dist/client/components/navigation";

const SignIn = () => {
  const t = useTranslations("SignIn");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message ?? t("genericError"));
      return;
    }

    const redirectTo = searchParams.get("redirectTo") ?? "/overview";
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <AuthCard
      eyebrow={t("badge")}
      title={t("heading")}
      subtitle={t("subheading")}
      footer={
        <span className="text-foreground-muted">
          {t("noAccount")}{" "}
          <Link
            href="/sign-up"
            className="font-medium text-success hover:underline"
          >
            {t("signUp")}
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

        <div className="flex flex-col gap-2">
          <PasswordField
            id="password"
            name="password"
            label={t("passwordLabel")}
            placeholder={t("passwordPlaceholder")}
            autoComplete="current-password"
            required
          />
          <Link
            href="/forgot-password"
            className="self-end text-sm text-success hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>

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

export default SignIn;
