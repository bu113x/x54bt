import { AssetDetail, EstimateInput } from "@/types/investment";
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

// Parses "8% – 16%" into [8, 16]. Kept simple/explicit
// rather than clever regex, since this drives numbers shown to investors.
const parseRange = (label: string): [number, number] => {
  const matches = label.match(/(\d+(?:\.\d+)?)%\s*–\s*(\d+(?:\.\d+)?)%/);
  if (!matches) return [0, 0];
  return [parseFloat(matches[1]), parseFloat(matches[2])];
};
