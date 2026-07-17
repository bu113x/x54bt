"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/auth-card";
import FormField from "@/components/auth/form-field";
import PasswordField from "@/components/auth/password-field";

const SignUp = () => {
  const t = useTranslations("SignUp");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // wire up to your signup mutation here
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
            href="/signin"
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
          label={t("fullNameLabel")}
          placeholder={t("fullNamePlaceholder")}
          autoComplete="name"
          required
        />

        <FormField
          id="email"
          type="email"
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          required
        />

        <PasswordField
          id="password"
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

        <Button type="submit" size="lg" className="mt-2 w-full cursor-pointer">
          {t("cta")}
        </Button>
      </form>
    </AuthCard>
  );
};

export default SignUp;
