import { createClient } from "@/lib/supabase/server";
import type { NotificationPreferences, UserProfile } from "@/types/investment";

export const getAccountData = async (): Promise<{
  profile: UserProfile;
  preferences: NotificationPreferences;
} | null> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [{ data: profileRow }, { data: prefsRow }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single(),
  ]);

  const profile: UserProfile = {
    fullName: profileRow?.full_name ?? "",
    email: user.email ?? "",
    emailVerified: Boolean(user.email_confirmed_at),
    phone: profileRow?.phone ?? undefined,
    country: profileRow?.country ?? undefined,
    memberSince: profileRow?.created_at ?? user.created_at,
  };

  const preferences: NotificationPreferences = {
    emailDeposits: prefsRow?.email_deposits ?? true,
    emailProfitDistributions: prefsRow?.email_profit_distributions ?? true,
    emailMarketing: prefsRow?.email_marketing ?? false,
    pushPriceAlerts: prefsRow?.push_price_alerts ?? true,
  };

  return { profile, preferences };
};
