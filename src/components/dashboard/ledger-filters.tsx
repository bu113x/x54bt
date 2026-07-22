"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  statusFilter: TransactionStatus | "all";
}

const LedgerFilters = ({ typeFilter, statusFilter }: LedgerFiltersProps) => {
  const t = useTranslations("Ledger");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: "type" | "status", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={typeFilter}
        onChange={(e) => updateParam("type", e.target.value)}
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
        onChange={(e) => updateParam("status", e.target.value)}
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
