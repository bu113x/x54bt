import {
  bitcoin,
  cardano,
  ethereum,
  litecoin,
  ripple,
  tether,
} from "@/assets/coins";
import type {
  ActivityItem,
  PortfolioHistoryPoint,
  PortfolioSummary,
  Position,
  RiskTierInfo,
  ExplorableAsset,
  LedgerTransaction,
  FaqItem,
  SupportChannel,
  NotificationPreferences,
  UserProfile,
} from "@/types/investment";

export const mockFaqItems: FaqItem[] = [
  {
    id: "faq_1",
    question: "How is my profit calculated?",
    answer:
      "Profit is based on the actual realized performance of the strategy your position is allocated to. We take a performance fee — a percentage of realized profit only, never a fee on your principal — and the remainder is credited to you.",
  },
  {
    id: "faq_2",
    question: "Can I lose money?",
    answer:
      "Yes. Trading and investing carry risk, and returns are not guaranteed. Historical performance ranges shown in the app are based on past results and do not guarantee future returns. Only invest funds you can afford to lose.",
  },
  {
    id: "faq_3",
    question: "How long does a withdrawal take?",
    answer:
      "Withdrawals are typically processed within 1–3 business days, depending on your payout method. You can track the status of any withdrawal from the Ledger page.",
  },
  {
    id: "faq_4",
    question: "What's the difference between risk tiers?",
    answer:
      "Conservative, Balanced, and Aggressive tiers reflect different strategy volatility. Higher potential returns generally come with higher potential drawdowns — pick a tier that matches how much volatility you're comfortable with.",
  },
  {
    id: "faq_5",
    question: "How do I close a position early?",
    answer:
      "Open the position from your Portfolio page and select Close Position. Depending on the strategy, early closure may affect realized profit compared to holding to the strategy's target horizon.",
  },
];

export const mockSupportChannels: SupportChannel[] = [
  {
    id: "chan_chat",
    type: "chat",
    label: "Live Chat",
    value: "Chat with our team",
    availability: "24/7",
  },
  {
    id: "chan_email",
    type: "email",
    label: "Email",
    value: "support@bullex.io",
    availability: "Response within 24h",
  },
];

export const mockUserProfile: UserProfile = {
  fullName: "Ahmad Hustler",
  email: "ahmad@example.com",
  emailVerified: true,
  phone: "+234 801 234 5678",
  country: "Nigeria",
  memberSince: "2026-01-14",
};

export const mockNotificationPreferences: NotificationPreferences = {
  emailDeposits: true,
  emailProfitDistributions: true,
  emailMarketing: false,
  pushPriceAlerts: true,
};

export const mockLedgerTransactions: LedgerTransaction[] = [
  {
    id: "txn_1",
    type: "profit_distribution",
    description:
      "Profit distributed from BTC position (net of performance fee)",
    assetSymbol: "BTC",
    amount: 214.6,
    status: "completed",
    timestamp: "2026-07-18T09:20:00Z",
    reference: "TXN-88213",
  },
  {
    id: "txn_2",
    type: "position_opened",
    description: "Opened SOL position",
    assetSymbol: "SOL",
    amount: -2000,
    status: "completed",
    timestamp: "2026-06-20T14:05:00Z",
    reference: "TXN-88104",
  },
  {
    id: "txn_3",
    type: "deposit",
    description: "Deposit via bank transfer",
    amount: 1500,
    status: "completed",
    timestamp: "2026-06-15T11:00:00Z",
    reference: "TXN-87990",
  },
  {
    id: "txn_4",
    type: "withdrawal",
    description: "Withdrawal to linked wallet",
    amount: -500,
    status: "completed",
    timestamp: "2026-06-02T16:40:00Z",
    reference: "TXN-87812",
  },
  {
    id: "txn_5",
    type: "withdrawal",
    description: "Withdrawal request to bank account",
    amount: -300,
    status: "pending",
    timestamp: "2026-07-19T08:10:00Z",
    reference: "TXN-88240",
  },
  {
    id: "txn_6",
    type: "deposit",
    description: "Deposit via card — declined by issuer",
    amount: 250,
    status: "failed",
    timestamp: "2026-07-10T13:25:00Z",
    reference: "TXN-88055",
  },
  {
    id: "txn_7",
    type: "position_closed",
    description: "Closed AVAX position",
    assetSymbol: "AVAX",
    amount: 742.2,
    status: "completed",
    timestamp: "2026-05-15T10:00:00Z",
    reference: "TXN-87540",
  },
  {
    id: "txn_8",
    type: "profit_distribution",
    description:
      "Profit distributed from ETH position (net of performance fee)",
    assetSymbol: "ETH",
    amount: 68.9,
    status: "completed",
    timestamp: "2026-07-01T09:15:00Z",
    reference: "TXN-87920",
  },
];

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

export const mockExplorableAssets: ExplorableAsset[] = [
  {
    id: "asset_btc",
    symbol: "BTC",
    name: "Bitcoin",
    logo: bitcoin,
    price: 67240.32,
    changePercent24h: 2.41,
    riskTier: "balanced",
    historicalRangeLabel: "8% – 16% / mo, historical",
    performanceFeePercent: 20,
    minInvestment: 100,
    sparkline: [61000, 62400, 61800, 63900, 65200, 64700, 67240],
  },
  {
    id: "asset_eth",
    symbol: "ETH",
    name: "Ethereum",
    logo: ethereum,
    price: 3482.17,
    changePercent24h: 1.12,
    riskTier: "conservative",
    historicalRangeLabel: "4% – 9% / mo, historical",
    performanceFeePercent: 15,
    minInvestment: 100,
    sparkline: [3210, 3255, 3190, 3340, 3410, 3390, 3482],
  },
  {
    id: "asset_ada",
    symbol: "ADA",
    name: "Cardano",
    logo: cardano,
    price: 178.94,
    changePercent24h: 5.87,
    riskTier: "aggressive",
    historicalRangeLabel: "12% – 28% / mo, historical",
    performanceFeePercent: 25,
    minInvestment: 100,
    sparkline: [142, 149, 138, 156, 165, 171, 178.94],
  },
  {
    id: "asset_usdt_vault",
    symbol: "USDT",
    name: "Tether (Yield Vault)",
    logo: tether,
    price: 1,
    changePercent24h: 0.01,
    riskTier: "conservative",
    historicalRangeLabel: "3% – 6% / mo, historical",
    performanceFeePercent: 12,
    minInvestment: 50,
    sparkline: [1, 1, 1.001, 0.999, 1, 1.001, 1],
  },
  {
    id: "asset_ltc",
    symbol: "LTC",
    name: "Litecoin",
    logo: litecoin,
    price: 612.5,
    changePercent24h: -1.34,
    riskTier: "balanced",
    historicalRangeLabel: "7% – 15% / mo, historical",
    performanceFeePercent: 20,
    minInvestment: 100,
    sparkline: [640, 632, 625, 618, 622, 605, 612.5],
  },
  {
    id: "asset_rpl",
    symbol: "RPL",
    name: "Ripple",
    logo: ripple,
    price: 42.18,
    changePercent24h: 4.02,
    riskTier: "aggressive",
    historicalRangeLabel: "10% – 24% / mo, historical",
    performanceFeePercent: 25,
    minInvestment: 100,
    sparkline: [33.2, 34.8, 36.1, 35.4, 38.9, 40.2, 42.18],
  },
];

export const mockClosedPositions: Position[] = [
  {
    id: "pos_c1",
    assetSymbol: "BTC",
    assetName: "Bitcoin",
    assetLogo: bitcoin,
    riskTier: "balanced",
    amountInvested: 1000,
    currentValue: 1184.5,
    pnl: 184.5,
    pnlPercent: 18.45,
    openedAt: "2026-04-10",
    status: "closed",
  },
  {
    id: "pos_c2",
    assetSymbol: "ADA",
    assetName: "Cardano",
    assetLogo: cardano,
    riskTier: "aggressive",
    amountInvested: 800,
    currentValue: 742.2,
    pnl: -57.8,
    pnlPercent: -7.23,
    openedAt: "2026-03-22",
    status: "closed",
  },
];
