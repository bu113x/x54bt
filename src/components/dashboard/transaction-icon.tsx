import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CircleDollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { ActivityType } from "@/types/investment";

const iconMap: Record<ActivityType, typeof ArrowDownToLine> = {
  deposit: ArrowDownToLine,
  withdrawal: ArrowUpFromLine,
  position_opened: TrendingUp,
  position_closed: TrendingDown,
  profit_distribution: CircleDollarSign,
};

const TransactionIcon = ({ type }: { type: ActivityType }) => {
  const Icon = iconMap[type];
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated">
      <Icon className="h-4 w-4 text-foreground-muted" />
    </span>
  );
};

export default TransactionIcon;
