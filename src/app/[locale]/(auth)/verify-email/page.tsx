"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/auth-card";
import FormField from "@/components/auth/form-field";
import { createClient } from "@/lib/supabase/client";

const VerifyEmail = () => {
  const t = useTranslations("VerifyEmail");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleResend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
    setIsSubmitting(false);
    setStatus(resendError ? "error" : "sent");
  };

  if (error) {
    return (
      <AuthCard
        eyebrow={t("badge")}
        title={t("errorTitle")}
        subtitle={t("errorSubtitle")}
      >
        <form onSubmit={handleResend} className="flex flex-col gap-5">
          <FormField
            id="email"
            name="email"
            type="email"
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            required
          />
          <Button
            type="submit"
            size="lg"
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("sending") : t("resend")}
          </Button>
          {status === "sent" && (
            <p className="text-sm text-success">{t("resent")}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-danger">{t("resendError")}</p>
          )}
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      eyebrow={t("badge")}
      title={t("checkInboxTitle")}
      subtitle={t("checkInboxSubtitle")}
    >
      <p className="text-sm text-foreground-muted">
        {t("noEmail")}{" "}
        <Link
          href="/sign-up"
          className="font-medium text-success hover:underline"
        >
          {t("backToSignup")}
        </Link>
      </p>
    </AuthCard>
  );
};

export default VerifyEmail;
