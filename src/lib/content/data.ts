import type { Asset } from "@/types/asset";
import {
  amandaS,
  davidK,
  jenniferL,
  lisaM,
  michealR,
  robertT,
} from "@/assets/investors";
import {
  bitcoin,
  cardano,
  ethereum,
  litecoin,
  ripple,
  tether,
} from "@/assets/coins";
import type { Testimonial } from "@/types/testimonial";

export const mockTestimonials: Testimonial[] = [
  {
    id: "amanda-s",
    investorName: "Amanda S.",
    role: "Investor since 2022",
    avatar: amandaS,
    quote:
      "I started with just $50 a month into Bitcoin and Ethereum. Two years later my portfolio has grown more than I expected, and I never had to think about timing the market.",
    metricValue: "+$18,200",
    metricLabel: "portfolio growth",
    rating: 5,
    coins: [
      { src: bitcoin, alt: "Bitcoin" },
      { src: ethereum, alt: "Ethereum" },
    ],
  },
  {
    id: "david-k",
    investorName: "David K.",
    role: "Investor since 2021",
    avatar: davidK,
    quote:
      "The recurring buy feature made it effortless. I set it up once and forgot about it, then checked back a year later and was genuinely surprised.",
    metricValue: "+64%",
    metricLabel: "since 2021",
    rating: 5,
    coins: [
      { src: bitcoin, alt: "Bitcoin" },
      { src: cardano, alt: "Cardano" },
      { src: ripple, alt: "Ripple" },
    ],
  },
  {
    id: "jennifer-l",
    investorName: "Jennifer L.",
    role: "Investor since 2023",
    avatar: jenniferL,
    quote:
      "I liked that I could diversify across a handful of assets without juggling five different apps. Everything sits in one portfolio view.",
    metricValue: "+$6,400",
    metricLabel: "portfolio growth",
    rating: 4,
    coins: [
      { src: ethereum, alt: "Ethereum" },
      { src: tether, alt: "Tether" },
    ],
  },
  {
    id: "lisa-m",
    investorName: "Lisa M.",
    role: "Investor since 2020",
    avatar: lisaM,
    quote:
      "Support actually picks up the phone. When I had a question about withdrawal timing, I got a straight answer in minutes.",
    metricValue: "+91%",
    metricLabel: "since 2020",
    rating: 5,
    coins: [
      { src: bitcoin, alt: "Bitcoin" },
      { src: litecoin, alt: "Litecoin" },
    ],
  },
  {
    id: "micheal-r",
    investorName: "Michael R.",
    role: "Investor since 2022",
    avatar: michealR,
    quote:
      "Simple onboarding, clear fees, no surprises. That's rarer than it should be in this space.",
    metricValue: "+$11,750",
    metricLabel: "portfolio growth",
    rating: 5,
    coins: [
      { src: ripple, alt: "Ripple" },
      { src: cardano, alt: "Cardano" },
      { src: tether, alt: "Tether" },
    ],
  },
  {
    id: "robert-t",
    investorName: "Robert T.",
    role: "Investor since 2023",
    avatar: robertT,
    quote:
      "I was hesitant about crypto until a friend showed me their portfolio dashboard. Started small, stayed consistent, and it's added up.",
    metricValue: "+38%",
    metricLabel: "since 2023",
    rating: 4,
    coins: [
      { src: bitcoin, alt: "Bitcoin" },
      { src: ethereum, alt: "Ethereum" },
      { src: litecoin, alt: "Litecoin" },
    ],
  },
];

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
