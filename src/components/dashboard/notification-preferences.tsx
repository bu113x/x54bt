"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import SettingsSection from "@/components/dashboard/settings";
import ToggleSwitch from "@/components/dashboard/toggle-switch";
import { supabase } from "@/lib/supabase/client";
import type { NotificationPreferences as NotificationPreferencesType } from "@/types/investment";

const columnMap: Record<keyof NotificationPreferencesType, string> = {
  emailDeposits: "email_deposits",
  emailProfitDistributions: "email_profit_distributions",
  emailMarketing: "email_marketing",
  pushPriceAlerts: "push_price_alerts",
};

const NotificationPreferences = ({
  preferences,
}: {
  preferences: NotificationPreferencesType;
}) => {
  const t = useTranslations("Account");
  const [prefs, setPrefs] = useState(preferences);
  const [error, setError] = useState<string | null>(null);

  const update =
    (key: keyof NotificationPreferencesType) => async (value: boolean) => {
      const previous = prefs[key];
      setPrefs((prev) => ({ ...prev, [key]: value })); // optimistic
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setPrefs((prev) => ({ ...prev, [key]: previous }));
        setError(t("genericError"));
        return;
      }

      const { error: updateError } = await supabase
        .from("notification_preferences")
        .update({ [columnMap[key]]: value })
        .eq("user_id", user.id);

      if (updateError) {
        setPrefs((prev) => ({ ...prev, [key]: previous })); // revert
        setError(updateError.message ?? t("genericError"));
      }
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
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
    </SettingsSection>
  );
};

export default NotificationPreferences;
