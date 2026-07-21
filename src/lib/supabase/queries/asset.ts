import { createClient } from "@/lib/supabase/server";
import { getMarketChart, getMarketData } from "@/lib/coingecko/client";
import type { CoinMarketData, PricePoint } from "@/lib/coingecko/client";
import type { AssetDetail, ExplorableAsset } from "@/types/investment";

interface AssetRow {
  id: string;
  symbol: string;
  name: string;
  logo_url: string | null;
  risk_tier: ExplorableAsset["riskTier"];
  coingecko_id: string | null;
  historical_range_low: number;
  historical_range_high: number;
  performance_fee_percent: number;
  min_investment: number;
  max_investment: number;
  about: string | null;
  strategy_description: string | null;
}

const formatRangeLabel = (low: number, high: number) =>
  `${low}% – ${high}% / mo, historical`;

export const getExplorableAssets = async (): Promise<ExplorableAsset[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assets")
    .select(
      `
      id, symbol, name, logo_url, risk_tier, coingecko_id,
      historical_range_low, historical_range_high,
      performance_fee_percent, min_investment, max_investment
    `,
    )
    .eq("is_active", true)
    .order("symbol")
    .returns<AssetRow[]>();

  if (error || !data) {
    console.error("Failed to fetch assets:", error);
    return [];
  }

  const coingeckoIds = data
    .map((row) => row.coingecko_id)
    .filter((id): id is string => Boolean(id));

  const marketData = await getMarketData(coingeckoIds);

  return data.map((row) => {
    const market = row.coingecko_id ? marketData[row.coingecko_id] : undefined;

    return {
      id: row.id,
      symbol: row.symbol,
      name: row.name,
      logo: row.logo_url ?? "",
      price: market?.current_price ?? 0,
      changePercent24h: market?.price_change_percentage_24h ?? 0,
      riskTier: row.risk_tier,
      historicalRangeLabel: formatRangeLabel(
        row.historical_range_low,
        row.historical_range_high,
      ),
      performanceFeePercent: row.performance_fee_percent,
      minInvestment: row.min_investment,
      sparkline: market?.sparkline_in_7d?.price ?? [],
    };
  });
};

export const getAssetBySymbol = async (
  symbol: string,
): Promise<AssetDetail | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assets")
    .select(
      `
      id, symbol, name, logo_url, risk_tier, coingecko_id,
      historical_range_low, historical_range_high,
      performance_fee_percent, min_investment, max_investment,
      about, strategy_description
    `,
    )
    .eq("symbol", symbol.toUpperCase())
    .eq("is_active", true)
    .single<AssetRow>();

  if (error || !data) return null;

  const [marketData, priceHistory] = await Promise.all([
    data.coingecko_id
      ? getMarketData([data.coingecko_id])
      : Promise.resolve<Record<string, CoinMarketData>>({}),
    data.coingecko_id
      ? getMarketChart(data.coingecko_id, 30)
      : Promise.resolve<PricePoint[]>([]),
  ]);
  const market = data.coingecko_id ? marketData[data.coingecko_id] : undefined;

  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    logo: data.logo_url ?? "",
    price: market?.current_price ?? 0,
    changePercent24h: market?.price_change_percentage_24h ?? 0,
    riskTier: data.risk_tier,
    historicalRangeLabel: formatRangeLabel(
      data.historical_range_low,
      data.historical_range_high,
    ),
    performanceFeePercent: data.performance_fee_percent,
    minInvestment: data.min_investment,
    maxInvestment: data.max_investment,
    priceHistory,
    about: data.about ?? "",
    strategyDescription: data.strategy_description ?? "",
  };
};
