import Image from "next/image";
import { Link } from "@/i18n/navigation";
import RiskTierBadge from "@/components/dashboard/risk-tier-badge";
import type { Position } from "@/types/investment";
import { formatCurrency, formatDate } from "@/lib/content/format";

const PositionRow = ({ position }: { position: Position }) => {
  const positive = position.pnl >= 0;

  return (
    <Link
      href={`/explore/${position.assetSymbol.toLowerCase()}`}
      className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] items-center gap-4 px-6 py-4 transition-colors hover:bg-surface-elevated"
    >
      <div className="flex items-center gap-3">
        <Image
          src={position.assetLogo}
          alt={position.assetName}
          width={36}
          height={36}
          className="h-9 w-9 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">{position.assetSymbol}</p>
          <p className="text-xs text-foreground-muted">{position.assetName}</p>
        </div>
      </div>

      <div>
        <RiskTierBadge tier={position.riskTier} />
      </div>

      <div>
        <p className="text-sm">{formatCurrency(position.amountInvested)}</p>
        <p className="text-xs text-foreground-muted">
          {formatDate(position.openedAt, "en-US")}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium">
          {formatCurrency(position.currentValue)}
        </p>
      </div>

      <div className="text-right">
        <p
          className={`text-sm font-medium ${positive ? "text-success" : "text-danger"}`}
        >
          {positive ? "+" : ""}
          {formatCurrency(position.pnl)}
        </p>
        <p className={`text-xs ${positive ? "text-success" : "text-danger"}`}>
          {positive ? "+" : ""}
          {position.pnlPercent.toFixed(2)}%
        </p>
      </div>
    </Link>
  );
};

export default PositionRow;
