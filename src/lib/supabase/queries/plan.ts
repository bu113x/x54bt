import { createClient } from "@/lib/supabase/server";
import type { InvestmentPlan, Plan } from "@/types/investment";

export const getPlans = async (): Promise<InvestmentPlan[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("investment_plans")
    .select(
      `
      id, slug, name, min_deposit, duration_days, expected_return
    `,
    )
    .eq("is_active", true)
    .order("sort_order")
    .returns<Plan[]>();

  if (error || !data) {
    console.error("Failed to fetch assets:", error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    minDeposit: row.min_deposit,
    durationDays: row.duration_days,
    expectedReturn: row.expected_return,
  }));
};
