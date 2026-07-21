import { createClient } from "@/lib/supabase/server";
import type { Position, PortfolioSummary, RiskTier } from "@/types/investment";

interface PositionRow {
  id: string;
  amount_invested: number;
  current_value: number;
  status: "active" | "closed";
  opened_at: string;
  assets: {
    symbol: string;
    name: string;
    logo_url: string | null;
    risk_tier: RiskTier;
  } | null;
}

const mapPosition = (row: PositionRow): Position => {
  const pnl = Number(row.current_value) - Number(row.amount_invested);
  const pnlPercent =
    Number(row.amount_invested) > 0
      ? (pnl / Number(row.amount_invested)) * 100
      : 0;

  return {
    id: row.id,
    assetSymbol: row.assets?.symbol ?? "—",
    assetName: row.assets?.name ?? "Unknown asset",
    assetLogo: row.assets?.logo_url ?? "",
    riskTier: row.assets?.risk_tier ?? "balanced",
    amountInvested: Number(row.amount_invested),
    currentValue: Number(row.current_value),
    pnl,
    pnlPercent,
    openedAt: row.opened_at,
    status: row.status,
  };
};

export const getPositions = async (
  status: "active" | "closed",
): Promise<Position[]> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("positions")
    .select(
      `
      id,
      amount_invested,
      current_value,
      status,
      opened_at,
      assets ( symbol, name, logo_url, risk_tier )
    `,
    )
    .eq("user_id", user.id)
    .eq("status", status)
    .order("opened_at", { ascending: false })
    .returns<PositionRow[]>();

  if (error || !data) {
    console.error("Failed to fetch positions:", error);
    return [];
  }

  return data.map(mapPosition);
};

export const getAllPositions = async (): Promise<Position[]> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("positions")
    .select(
      `
      id,
      amount_invested,
      current_value,
      status,
      opened_at,
      assets ( symbol, name, logo_url, risk_tier )
    `,
    )
    .eq("user_id", user.id)
    .order("opened_at", { ascending: false })
    .returns<PositionRow[]>();

  if (error || !data) {
    console.error("Failed to fetch positions:", error);
    return [];
  }

  return data.map(mapPosition);
};

export const getPortfolioSummary = async (
  allPositions: Position[],
): Promise<PortfolioSummary> => {
  const activePositions = allPositions.filter((p) => p.status === "active");

  const totalValue = activePositions.reduce(
    (sum, p) => sum + p.currentValue,
    0,
  );
  const totalDeposited = allPositions.reduce(
    (sum, p) => sum + p.amountInvested,
    0,
  );
  const totalProfit = allPositions.reduce((sum, p) => sum + p.pnl, 0);

  const performanceFeePaid = 0;

  const allTimeChangePercent =
    totalDeposited > 0 ? (totalProfit / totalDeposited) * 100 : 0;

  return {
    totalValue,
    totalDeposited,
    totalProfit,
    performanceFeePaid,
    activePositionsCount: activePositions.length,
    allTimeChangePercent,
  };
};
