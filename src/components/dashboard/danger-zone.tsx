"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import SettingsSection from "@/components/dashboard/settings";

const DangerZone = () => {
  const t = useTranslations("Account");
  const [confirming, setConfirming] = useState(false);

  return (
    <SettingsSection
      title={t("dangerZone")}
      description={t("dangerZoneDescription")}
    >
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="rounded-lg border border-danger/40 px-4 py-2 text-sm text-danger transition-colors hover:bg-danger/10 cursor-pointer"
        >
          {t("deleteAccount")}
        </button>
      ) : (
        <div className="flex flex-col gap-3 rounded-lg border border-danger/40 bg-danger/5 p-4">
          <p className="text-sm">{t("deleteAccountConfirm")}</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                // TODO: wire to an account-deletion server action / edge function
                setConfirming(false);
              }}
              className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
            >
              {t("confirmDelete")}
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm text-foreground-muted hover:bg-surface-elevated cursor-pointer"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </SettingsSection>
  );
};

export default DangerZone;
