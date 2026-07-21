import { createClient } from "@/lib/supabase/server";
import type { PortfolioHistoryPoint } from "@/types/investment";

export const getPortfolioHistory = async (
  days: number = 180,
): Promise<PortfolioHistoryPoint[]> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const { data, error } = await supabase
    .from("portfolio_snapshots")
    .select("total_value, snapshot_date")
    .eq("user_id", user.id)
    .gte("snapshot_date", cutoff.toISOString().slice(0, 10))
    .order("snapshot_date", { ascending: true });

  if (error || !data) {
    console.error("Failed to fetch portfolio history:", error);
    return [];
  }

  return data.map((row) => ({
    date: row.snapshot_date,
    value: Number(row.total_value),
  }));
};
