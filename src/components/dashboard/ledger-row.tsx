import { useLocale, useTranslations } from "next-intl";
import TransactionIcon from "@/components/dashboard/transaction-icon";
import TransactionStatusBadge from "@/components/dashboard/transaction-status-badge";
import type { LedgerTransaction } from "@/types/investment";
import { formatDate } from "@/lib/content/format";

const formatCurrency = (value: number) => {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const LedgerRow = ({ transaction }: { transaction: LedgerTransaction }) => {
  const t = useTranslations("Ledger");
  const locale = useLocale();

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 px-6 py-4">
      <div className="flex items-center gap-3">
        <TransactionIcon type={transaction.type} />
        <div>
          <p className="text-sm">{transaction.description}</p>
          <p className="text-xs text-foreground-muted">
            {transaction.reference} ·{" "}
            {formatDate(transaction.timestamp, locale)}
          </p>
        </div>
      </div>

      <div>
        <TransactionStatusBadge status={transaction.status} />
      </div>

      <div className="text-sm text-foreground-muted">
        {transaction.assetSymbol ?? "—"}
      </div>

      <div className="text-right">
        <p
          className={`text-sm font-medium ${
            transaction.amount >= 0 ? "text-success" : "text-foreground"
          }`}
        >
          {formatCurrency(transaction.amount)}
        </p>
      </div>
    </div>
  );
};

export default LedgerRow;
