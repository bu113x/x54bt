export interface PayableCurrency {
  code: string;
  label: string;
}

export const payableCurrencies: PayableCurrency[] = [
  { code: "btc", label: "Bitcoin (BTC)" },
  { code: "eth", label: "Ethereum (ETH)" },
  { code: "usdttrc20", label: "USDT (TRC20)" },
  { code: "usdterc20", label: "USDT (ERC20)" },
  { code: "ltc", label: "Litecoin (LTC)" },
  { code: "bnbbsc", label: "BNB (BSC)" },
];
