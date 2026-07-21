import { createClient } from "@/lib/supabase/server";
import type { ActivityItem } from "@/types/investment";

export const getRecentActivity = async (
  limit: number = 4,
): Promise<ActivityItem[]> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("ledger_transactions")
    .select("id, type, description, amount, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.error("Failed to fetch recent activity:", error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    type: row.type,
    description: row.description,
    amount: Number(row.amount),
    timestamp: row.created_at,
  }));
};
