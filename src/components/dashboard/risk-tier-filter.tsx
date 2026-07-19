"use client";

import { useTranslations } from "next-intl";
import type { RiskTier } from "@/types/investment";

const tiers: RiskTier[] = ["conservative", "balanced", "aggressive"];

interface RiskTierFilterProps {
  selected: RiskTier | "all";
  onChange: (tier: RiskTier | "all") => void;
}

const RiskTierFilter = ({ selected, onChange }: RiskTierFilterProps) => {
  const t = useTranslations("RiskTiers");

  const options: (RiskTier | "all")[] = ["all", ...tiers];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors cursor-pointer ${
            selected === option
              ? "border-primary bg-primary/10 font-medium text-primary"
              : "border-border text-foreground-muted hover:bg-surface-elevated"
          }`}
        >
          {option === "all" ? t("all") : t(option)}
        </button>
      ))}
    </div>
  );
};

export default RiskTierFilter;
