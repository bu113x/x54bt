import type { Asset } from "@/types/asset";

export const mockAssets: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", priceUsd: 67423, change24hPct: 1.86 },
  { symbol: "ETH", name: "Ethereum", priceUsd: 3842, change24hPct: 2.37 },
  { symbol: "SOL", name: "Solana", priceUsd: 142.56, change24hPct: 6.19 },
  { symbol: "XRP", name: "XRP", priceUsd: 0.62, change24hPct: -0.94 },
  { symbol: "ADA", name: "Cardano", priceUsd: 0.45, change24hPct: 3.12 },
];

export const steps = [
  {
    number: "01",
    title: "Register",
    description: "Create your free Bullex account in under a minute.",
  },
  {
    number: "02",
    title: "Verify",
    description: "Confirm your identity with a quick verification step.",
  },
  {
    number: "03",
    title: "Deposit",
    description: "Fund your account with any supported cryptocurrency.",
  },
  {
    number: "04",
    title: "Invest",
    description: "Buy, sell, and hold from 50+ assets, 24/7.",
  },
];

export const badges = [
  {
    title: "Secure custody",
    description:
      "Client funds held in segregated wallets, with the majority kept in offline cold storage.",
  },
  {
    title: "Fast verification",
    description:
      "Identity verification typically completes in minutes, not days.",
  },
  {
    title: "24/7 support",
    description:
      "Real people available around the clock, every day of the year.",
  },
];
