"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import PasswordField from "@/components/auth/password-field";
import SettingsSection from "@/components/dashboard/settings";
import { supabase } from "@/lib/supabase/client";

const ChangePasswordForm = () => {
  const t = useTranslations("Account");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const formData = new FormData(e.currentTarget);
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (newPassword !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    setIsSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setIsSubmitting(false);

    if (updateError) {
      setError(updateError.message ?? t("genericError"));
      return;
    }

    setSaved(true);
    e.currentTarget.reset();
  };

  return (
    <SettingsSection
      title={t("changePassword")}
      description={t("changePasswordDescription")}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <PasswordField
            id="newPassword"
            name="newPassword"
            label={t("newPasswordLabel")}
            autoComplete="new-password"
            required
          />
          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label={t("confirmPasswordLabel")}
            autoComplete="new-password"
            required
          />
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}
        {saved && (
          <p className="text-sm text-success">{t("passwordUpdated")}</p>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? t("saving") : t("updatePassword")}
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
};

export default ChangePasswordForm;
