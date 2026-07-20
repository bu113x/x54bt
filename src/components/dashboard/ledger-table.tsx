import { useTranslations } from "next-intl";
import LedgerRow from "@/components/dashboard/ledger-row";
import type { LedgerTransaction } from "@/types/investment";

const LedgerTable = ({
  transactions,
}: {
  transactions: LedgerTransaction[];
}) => {
  const t = useTranslations("Ledger");

  if (transactions.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border p-12 text-center text-sm text-foreground-muted">
        {t("noTransactions")}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-border px-6 py-3 text-xs uppercase tracking-wide text-foreground-muted sm:grid">
        <span>{t("transaction")}</span>
        <span>{t("status")}</span>
        <span>{t("asset")}</span>
        <span className="text-right">{t("amount")}</span>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((txn) => (
          <LedgerRow key={txn.id} transaction={txn} />
        ))}
      </div>
    </div>
  );
};

export default LedgerTable;
