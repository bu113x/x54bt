import type { FaqItem, SupportChannel } from "@/types/investment";

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
