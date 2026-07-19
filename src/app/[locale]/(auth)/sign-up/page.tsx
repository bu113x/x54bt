"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/auth-card";
import FormField from "@/components/auth/form-field";
import PasswordField from "@/components/auth/password-field";
import { createClient } from "@/lib/supabase/client";

const SignUp = () => {
  const t = useTranslations("SignUp");
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("fullName") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message ?? t("genericError"));
      return;
    }

    router.push("/verify-email");
  };

  return (
    <AuthCard
      eyebrow={t("badge")}
      title={t("heading")}
      subtitle={t("subheading")}
      footer={
        <span className="text-foreground-muted">
          {t("hasAccount")}{" "}
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
          id="fullName"
          name="fullName"
          label={t("fullNameLabel")}
          placeholder={t("fullNamePlaceholder")}
          autoComplete="name"
          required
        />

        <FormField
          id="email"
          name="email"
          type="email"
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          required
        />

        <PasswordField
          id="password"
          name="password"
          label={t("passwordLabel")}
          placeholder={t("passwordPlaceholder")}
          autoComplete="new-password"
          required
        />

        <label className="flex items-start gap-2.5 text-sm text-foreground-muted">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border accent-success"
            required
          />
          <span>
            {t("termsPrefix")}{" "}
            <Link
              href="/legal/terms-of-service"
              className="text-success hover:underline"
            >
              {t("termsLink")}
            </Link>{" "}
            {t("termsAnd")}{" "}
            <Link
              href="/legal/privacy-policy"
              className="text-success hover:underline"
            >
              {t("privacyLink")}
            </Link>
          </span>
        </label>

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

export default SignUp;
