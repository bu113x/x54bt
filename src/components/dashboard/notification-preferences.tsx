"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import SettingsSection from "@/components/dashboard/settings";
import ToggleSwitch from "@/components/dashboard/toggle-switch";
import type { NotificationPreferences as NotificationPreferencesType } from "@/types/investment";

const NotificationPreferences = ({
  preferences,
}: {
  preferences: NotificationPreferencesType;
}) => {
  const t = useTranslations("Account");
  const [prefs, setPrefs] = useState(preferences);

  const update =
    (key: keyof NotificationPreferencesType) => (value: boolean) => {
      setPrefs((prev) => ({ ...prev, [key]: value }));
      // TODO: persist to Supabase (e.g. a `user_preferences` table) once wired up
    };

  return (
    <SettingsSection
      title={t("notifications")}
      description={t("notificationsDescription")}
    >
      <div className="divide-y divide-border">
        <ToggleSwitch
          checked={prefs.emailDeposits}
          onChange={update("emailDeposits")}
          label={t("emailDeposits")}
          description={t("emailDepositsDescription")}
        />
        <ToggleSwitch
          checked={prefs.emailProfitDistributions}
          onChange={update("emailProfitDistributions")}
          label={t("emailProfitDistributions")}
          description={t("emailProfitDistributionsDescription")}
        />
        <ToggleSwitch
          checked={prefs.pushPriceAlerts}
          onChange={update("pushPriceAlerts")}
          label={t("pushPriceAlerts")}
          description={t("pushPriceAlertsDescription")}
        />
        <ToggleSwitch
          checked={prefs.emailMarketing}
          onChange={update("emailMarketing")}
          label={t("emailMarketing")}
          description={t("emailMarketingDescription")}
        />
      </div>
    </SettingsSection>
  );
};

export default NotificationPreferences;
