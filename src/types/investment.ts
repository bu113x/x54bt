import { StaticImageData } from "next/image";

export type RiskTier = "conservative" | "balanced" | "aggressive";

export interface Position {
  id: string;
  assetSymbol: string;
  assetName: string;
  assetLogo: StaticImageData;
  riskTier: RiskTier;
  amountInvested: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  openedAt: string; // ISO date
  status: "active" | "closed";
}

export interface PortfolioSummary {
  totalValue: number;
  totalDeposited: number;
  totalProfit: number; // net of performance fee, i.e. investor's take
  performanceFeePaid: number; // platform's cut of realized profit
  activePositionsCount: number;
  allTimeChangePercent: number;
}

export interface PortfolioHistoryPoint {
  date: string; // ISO date
  value: number;
}

export type ActivityType =
  | "deposit"
  | "withdrawal"
  | "position_opened"
  | "position_closed"
  | "profit_distribution";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  description: string;
  amount: number;
  timestamp: string; // ISO
}

export interface RiskTierInfo {
  tier: RiskTier;
  label: string;
  description: string;
  historicalRangeLabel: string; // e.g. "6% – 14% / mo, historical"
  performanceFeePercent: number; // platform's cut of realized profit on this tier
}

export interface ExplorableAsset {
  id: string;
  symbol: string;
  name: string;
  logo: StaticImageData;
  price: number;
  changePercent24h: number;
  riskTier: RiskTier;
  historicalRangeLabel: string; // e.g. "8% – 16% / mo, historical"
  performanceFeePercent: number;
  minInvestment: number;
  sparkline: number[];
}
