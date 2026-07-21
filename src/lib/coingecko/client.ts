const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

const apiKey = process.env.COINGECKO_API_KEY;

if (!apiKey) {
  console.warn(
    "COINGECKO_API_KEY is not set. Live price data will be unavailable.",
  );
}

interface CoinGeckoFetchOptions {
  revalidateSeconds?: number;
}

const coingeckoFetch = async <T>(
  path: string,
  params: Record<string, string>,
  { revalidateSeconds = 300 }: CoinGeckoFetchOptions = {},
): Promise<T | null> => {
  if (!apiKey) return null;

  const url = new URL(`${COINGECKO_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value),
  );

  try {
    const response = await fetch(url.toString(), {
      headers: { "x-cg-demo-api-key": apiKey },
      next: { revalidate: revalidateSeconds },
    });

    if (!response.ok) {
      console.error(`CoinGecko request failed: ${response.status} ${path}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("CoinGecko request error:", error);
    return null;
  }
};

export interface CoinMarketData {
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: { price: number[] };
}

export const getMarketData = async (
  coingeckoIds: string[],
): Promise<Record<string, CoinMarketData>> => {
  if (coingeckoIds.length === 0) return {};

  const data = await coingeckoFetch<CoinMarketData[]>("/coins/markets", {
    vs_currency: "usd",
    ids: coingeckoIds.join(","),
    sparkline: "true",
    price_change_percentage: "24h",
  });

  if (!data) return {};

  return Object.fromEntries(data.map((coin) => [coin.id, coin]));
};

interface MarketChartResponse {
  prices: [number, number][];
}

export interface PricePoint {
  date: string;
  price: number;
}

export const getMarketChart = async (
  coingeckoId: string,
  days: number = 30,
): Promise<PricePoint[]> => {
  const data = await coingeckoFetch<MarketChartResponse>(
    `/coins/${coingeckoId}/market_chart`,
    { vs_currency: "usd", days: String(days) },
    { revalidateSeconds: 600 },
  );

  if (!data) return [];

  return data.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toISOString(),
    price,
  }));
};
