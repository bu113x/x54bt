import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ProfileCard from "@/components/dashboard/profile-card";
import ProfileDetailsForm from "@/components/dashboard/profile-details-form";
import ChangePasswordForm from "@/components/dashboard/change-password-form";
import NotificationPreferences from "@/components/dashboard/notification-preferences";
import DangerZone from "@/components/dashboard/danger-zone";
import { getAccountData } from "@/lib/supabase/queries/account";

const AccountPage = async () => {
  const t = await getTranslations("Account");
  const accountData = await getAccountData();

  if (!accountData) {
    redirect("/sign-in");
  }

  const { profile, preferences } = accountData;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("heading")}
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">{t("subheading")}</p>
      </div>

      <ProfileCard profile={profile} />
      <ProfileDetailsForm profile={profile} />
      <ChangePasswordForm />
      <NotificationPreferences preferences={preferences} />
      <DangerZone />
    </div>
  );
};

export default AccountPage;
