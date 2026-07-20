import { useTranslations } from "next-intl";
import ProfileCard from "@/components/dashboard/profile-card";
import ProfileDetailsForm from "@/components/dashboard/profile-details-form";
import ChangePasswordForm from "@/components/dashboard/change-password-form";
import NotificationPreferences from "@/components/dashboard/notification-preferences";
import DangerZone from "@/components/dashboard/danger-zone";
import {
  mockNotificationPreferences,
  mockUserProfile,
} from "@/lib/content/dashboard";

const AccountPage = () => {
  const t = useTranslations("Account");

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

      <ProfileCard profile={mockUserProfile} />
      <ProfileDetailsForm profile={mockUserProfile} />
      <ChangePasswordForm />
      <NotificationPreferences preferences={mockNotificationPreferences} />
      <DangerZone />
    </div>
  );
};

export default AccountPage;
