import { useTranslations } from "next-intl";
import type { RiskTier } from "@/types/investment";

const riskTierStyles: Record<RiskTier, string> = {
  conservative: "bg-success/10 text-success",
  balanced: "bg-primary/10 text-primary",
  aggressive: "bg-danger/10 text-danger",
};

const RiskTierBadge = ({ tier }: { tier: RiskTier }) => {
  const t = useTranslations("RiskTiers");

  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${riskTierStyles[tier]}`}
    >
      {t(tier)}
    </span>
  );
};

export default RiskTierBadge;
