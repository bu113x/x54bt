import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

const RiskDisclosureBanner = ({ compact = false }: { compact?: boolean }) => {
  const t = useTranslations("RiskDisclosure");

  return (
    <div
      className={`flex items-start gap-3 rounded-card border border-yellow-600/30 bg-yellow-300/10 ${
        compact ? "px-4 py-2.5" : "px-5 py-4"
      }`}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p className="text-xs leading-relaxed text-primary">{t("message")}</p>
    </div>
  );
};

export default RiskDisclosureBanner;
