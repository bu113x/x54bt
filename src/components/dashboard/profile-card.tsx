import { ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { UserProfile } from "@/types/investment";
import { formatDate } from "@/lib/content/format";

const ProfileCard = ({ profile }: { profile: UserProfile }) => {
  const t = useTranslations("Account");
  const locale = useLocale();
  const initial = profile.fullName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4 rounded-card border border-border bg-surface p-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-xl font-semibold text-primary">
        {initial}
      </span>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{profile.fullName}</p>
          {profile.emailVerified && (
            <span className="inline-flex items-center gap-1 rounded bg-success/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-success">
              <ShieldCheck className="h-3 w-3" />
              {t("verified")}
            </span>
          )}
        </div>
        <p className="text-sm text-foreground-muted">{profile.email}</p>
        <p className="mt-1 text-xs text-foreground-muted">
          {t("memberSince")} {formatDate(profile.memberSince, locale)}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
