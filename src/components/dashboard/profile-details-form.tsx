"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import FormField from "@/components/auth/form-field";
import SettingsSection from "@/components/dashboard/settings";
import { supabase } from "@/lib/supabase/client";
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
    const fullName = String(formData.get("fullName") ?? "");
    const phone = String(formData.get("phone") ?? "");

    setIsSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsSubmitting(false);
      setError(t("genericError"));
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone })
      .eq("id", user.id);

    if (profileError) {
      setIsSubmitting(false);
      setError(profileError.message ?? t("genericError"));
      return;
    }

    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone },
    });

    setIsSubmitting(false);

    if (authError) {
      setError(authError.message ?? t("genericError"));
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
