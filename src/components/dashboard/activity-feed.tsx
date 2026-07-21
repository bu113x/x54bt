import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CircleDollarSign,
  List,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ActivityItem, ActivityType } from "@/types/investment";
import { formatCurrency, formatDate } from "@/lib/content/format";

const iconMap: Record<ActivityType, typeof ArrowDownToLine> = {
  deposit: ArrowDownToLine,
  withdrawal: ArrowUpFromLine,
  position_opened: TrendingUp,
  position_closed: TrendingDown,
  profit_distribution: CircleDollarSign,
};

const ActivityFeed = ({ items }: { items: ActivityItem[] }) => {
  const t = useTranslations("Activity");

  return (
    <div className="rounded-card border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h3 className="font-semibold">{t("recentActivity")}</h3>
        <Link href="/ledger" className="text-sm text-primary hover:underline">
          {t("viewLedger")}
        </Link>
      </div>

      <div className="divide-y divide-border">
        {!!items.length ? (
          items.map((item) => {
            const Icon = iconMap[item.type];
            return (
              <div
                key={item.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated">
                    <Icon className="h-4 w-4 text-foreground-muted" />
                  </span>
                  <div>
                    <p className="text-sm">{item.description}</p>
                    <p className="text-xs text-foreground-muted">
                      {formatDate(item.timestamp, "en-US")}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm font-medium ${item.amount >= 0 ? "text-success" : "text-foreground"}`}
                >
                  {formatCurrency(item.amount)}
                </p>
              </div>
            );
          })
        ) : (
          <div className="min-h-48 w-full flex flex-col justify-center items-center rounded gap-y-2">
            <List className="h-12 w-12 text-foreground-muted opacity-30" />
            <p className="text-center mt-2 text-sm text-foreground-muted opacity-30">
              {t("noActivityYet")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
