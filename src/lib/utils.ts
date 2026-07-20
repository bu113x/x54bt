import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely, resolving conflicts (e.g. "px-2" vs "px-4")
 * in favor of the last one. Use this any time you accept a `className` prop
 * or conditionally combine classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { AssetDetail, InvestmentEstimate } from "@/types/investment";

// Parses "8% – 16% / mo, historical" into [8, 16]. Kept simple/explicit
// rather than clever regex, since this drives numbers shown to investors.
const parseRange = (label: string): [number, number] => {
  const matches = label.match(/(\d+(?:\.\d+)?)%\s*–\s*(\d+(?:\.\d+)?)%/);
  if (!matches) return [0, 0];
  return [parseFloat(matches[1]), parseFloat(matches[2])];
};

export const calculateEstimate = (
  amount: number,
  asset: AssetDetail,
): InvestmentEstimate => {
  const [lowPct, highPct] = parseRange(asset.historicalRangeLabel);

  const grossLow = amount * (lowPct / 100);
  const grossHigh = amount * (highPct / 100);

  const feeLow = grossLow * (asset.performanceFeePercent / 100);
  const feeHigh = grossHigh * (asset.performanceFeePercent / 100);

  return {
    amount,
    estimatedGrossReturnLow: grossLow,
    estimatedGrossReturnHigh: grossHigh,
    estimatedFeeLow: feeLow,
    estimatedFeeHigh: feeHigh,
    estimatedNetReturnLow: grossLow - feeLow,
    estimatedNetReturnHigh: grossHigh - feeHigh,
  };
};
