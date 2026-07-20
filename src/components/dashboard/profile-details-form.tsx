"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import FormField from "@/components/auth/form-field";
import SettingsSection from "@/components/dashboard/settings";
import { createClient } from "@/lib/supabase/client";
import type { UserProfile } from "@/types/investment";

const ProfileDetailsForm = ({ profile }: { profile: UserProfile }) => {
  const t = useTranslations("Account");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const formData = new FormData(e.currentTarget);
    const full_name = String(formData.get("fullName") ?? "");
    const phone = String(formData.get("phone") ?? "");

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      data: { full_name, phone },
    });
    setIsSubmitting(false);

    if (updateError) {
      setError(updateError.message ?? t("genericError"));
      return;
    }

    setSaved(true);
  };

  return (
    <SettingsSection
      title={t("profileDetails")}
      description={t("profileDetailsDescription")}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="fullName"
            name="fullName"
            label={t("fullNameLabel")}
            defaultValue={profile.fullName}
            required
          />
          <FormField
            id="phone"
            name="phone"
            type="tel"
            label={t("phoneLabel")}
            defaultValue={profile.phone}
          />
        </div>

        <FormField
          id="email"
          name="email"
          type="email"
          label={t("emailLabel")}
          defaultValue={profile.email}
          disabled
        />

        {error && <p className="text-sm text-danger">{error}</p>}
        {saved && <p className="text-sm text-success">{t("saved")}</p>}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? t("saving") : t("saveChanges")}
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
};

export default ProfileDetailsForm;
