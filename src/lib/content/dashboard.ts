import { bitcoin, cardano, ethereum, tether } from "@/assets/coins";
import type {
  ActivityItem,
  PortfolioHistoryPoint,
  PortfolioSummary,
  Position,
  FaqItem,
  SupportChannel,
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
