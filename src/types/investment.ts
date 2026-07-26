export type RiskTier = "conservative" | "balanced" | "aggressive";

export interface Position {
  id: string;
  assetSymbol: string;
  assetName: string;
  assetLogo: string;
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
  historicalRangeLabel: string; // e.g. "6% – 14%"
  performanceFeePercent: number;
}

export interface ExplorableAsset {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  changePercent24h: number;
  riskTier: RiskTier;
  historicalRangeLabel: string; // e.g. "8% – 16%"
  performanceFeePercent: number;
  minInvestment: number;
  sparkline: number[];
}

export type TransactionStatus = "completed" | "pending" | "failed";

export interface LedgerTransaction {
  id: string;
  type: ActivityType;
  description: string;
  assetSymbol?: string;
  amount: number;
  status: TransactionStatus;
  timestamp: string; // ISO
  reference: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  country?: string;
  memberSince: string; // ISO date
  avatarUrl?: string;
}

export interface NotificationPreferences {
  emailDeposits: boolean;
  emailProfitDistributions: boolean;
  emailMarketing: boolean;
  pushPriceAlerts: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SupportChannel {
  id: string;
  type: "chat" | "email" | "phone";
  label: string;
  value: string;
  availability: string;
}

export interface AssetDetail {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  changePercent24h: number;
  riskTier: RiskTier;
  historicalRangeLabel: string;
  performanceFeePercent: number;
  minInvestment: number;
  maxInvestment: number;
  priceHistory: { date: string; price: number }[];
  about: string;
  strategyDescription: string;
}

export interface InvestmentPlan {
  id: string;
  slug: string;
  name: string;
  minDeposit: number;
  durationDays: number;
  expectedReturn: number; // e.g. 12 for 12%
}

export interface Plan {
  id: string;
  slug: string;
  name: string;
  min_deposit: number;
  duration_days: number;
  expected_return: number; // e.g. 12 for 12%
}

export interface EstimateInput {
  minInvestment: number;
  maxInvestment: number;
  historicalRangeLow: number; // monthly %, e.g. 8 for 8%
  historicalRangeHigh: number; // monthly %, e.g. 16 for 16%
  performanceFeePercent: number;
}
