"use client";

import { useTranslations } from "next-intl";
import type { ActivityType, TransactionStatus } from "@/types/investment";

const types: ActivityType[] = [
  "deposit",
  "withdrawal",
  "position_opened",
  "position_closed",
  "profit_distribution",
];

const statuses: TransactionStatus[] = ["completed", "pending", "failed"];

interface LedgerFiltersProps {
  typeFilter: ActivityType | "all";
  onTypeChange: (value: ActivityType | "all") => void;
  statusFilter: TransactionStatus | "all";
  onStatusChange: (value: TransactionStatus | "all") => void;
}

const LedgerFilters = ({
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
}: LedgerFiltersProps) => {
  const t = useTranslations("Ledger");

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value as ActivityType | "all")}
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary cursor-pointer"
      >
        <option value="all">{t("allTypes")}</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {t(type)}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusChange(e.target.value as TransactionStatus | "all")
        }
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary cursor-pointer"
      >
        <option value="all">{t("allStatuses")}</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {t(status)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LedgerFilters;
