import { useTranslations } from "next-intl";
import type { TransactionStatus } from "@/types/investment";

const statusStyles: Record<TransactionStatus, string> = {
  completed: "bg-success/10 text-success",
  pending: "bg-primary/10 text-primary",
  failed: "bg-danger/10 text-danger",
};

const TransactionStatusBadge = ({ status }: { status: TransactionStatus }) => {
  const t = useTranslations("Ledger");

  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusStyles[status]}`}
    >
      {t(status)}
    </span>
  );
};

export default TransactionStatusBadge;
