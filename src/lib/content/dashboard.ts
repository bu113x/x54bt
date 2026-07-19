import { bitcoin, cardano, ethereum, tether } from "@/assets/coins";
import type {
  ActivityItem,
  PortfolioHistoryPoint,
  PortfolioSummary,
  Position,
  RiskTierInfo,
} from "@/types/investment";

export const riskTiers: RiskTierInfo[] = [
  {
    tier: "conservative",
    label: "Conservative",
    description: "Lower volatility strategies, capital preservation focus.",
    historicalRangeLabel: "4% – 9% / mo, historical",
    performanceFeePercent: 15,
  },
  {
    tier: "balanced",
    label: "Balanced",
    description: "Mixed strategies balancing growth and drawdown control.",
    historicalRangeLabel: "8% – 16% / mo, historical",
    performanceFeePercent: 20,
  },
  {
    tier: "aggressive",
    label: "Aggressive",
    description: "Higher volatility, higher potential return strategies.",
    historicalRangeLabel: "12% – 28% / mo, historical",
    performanceFeePercent: 25,
  },
];

export const mockPortfolioSummary: PortfolioSummary = {
  totalValue: 14280.55,
  totalDeposited: 11500,
  totalProfit: 2780.55,
  performanceFeePaid: 695.14,
  activePositionsCount: 4,
  allTimeChangePercent: 24.18,
};

export const mockPositions: Position[] = [
  {
    id: "pos_1",
    assetSymbol: "BTC",
    assetName: "Bitcoin",
    assetLogo: bitcoin,
    riskTier: "balanced",
    amountInvested: 5000,
    currentValue: 6142.3,
    pnl: 1142.3,
    pnlPercent: 22.85,
    openedAt: "2026-05-02",
    status: "active",
  },
  {
    id: "pos_2",
    assetSymbol: "ETH",
    assetName: "Ethereum",
    assetLogo: ethereum,
    riskTier: "conservative",
    amountInvested: 3000,
    currentValue: 3287.4,
    pnl: 287.4,
    pnlPercent: 9.58,
    openedAt: "2026-06-01",
    status: "active",
  },
  {
    id: "pos_3",
    assetSymbol: "ADA",
    assetName: "Cardano",
    assetLogo: cardano,
    riskTier: "aggressive",
    amountInvested: 2000,
    currentValue: 2601.85,
    pnl: 601.85,
    pnlPercent: 30.09,
    openedAt: "2026-06-20",
    status: "active",
  },
  {
    id: "pos_4",
    assetSymbol: "USDT",
    assetName: "Tether (Yield Vault)",
    assetLogo: tether,
    riskTier: "conservative",
    amountInvested: 1500,
    currentValue: 1549,
    pnl: 49,
    pnlPercent: 3.27,
    openedAt: "2026-07-05",
    status: "active",
  },
];

export const mockPortfolioHistory: PortfolioHistoryPoint[] = [
  { date: "2026-01-19", value: 11500 },
  { date: "2026-02-19", value: 11890 },
  { date: "2026-03-19", value: 12210 },
  { date: "2026-04-19", value: 11970 },
  { date: "2026-05-19", value: 12680 },
  { date: "2026-06-19", value: 13420 },
  { date: "2026-07-19", value: 14280.55 },
];

export const mockActivity: ActivityItem[] = [
  {
    id: "act_1",
    type: "profit_distribution",
    description:
      "Profit distributed from BTC position (net of performance fee)",
    amount: 214.6,
    timestamp: "2026-07-18T09:20:00Z",
  },
  {
    id: "act_2",
    type: "position_opened",
    description: "Opened SOL position",
    amount: -2000,
    timestamp: "2026-06-20T14:05:00Z",
  },
  {
    id: "act_3",
    type: "deposit",
    description: "Deposit via bank transfer",
    amount: 1500,
    timestamp: "2026-06-15T11:00:00Z",
  },
  {
    id: "act_4",
    type: "withdrawal",
    description: "Withdrawal to linked wallet",
    amount: -500,
    timestamp: "2026-06-02T16:40:00Z",
  },
];
