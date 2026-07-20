"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import LedgerTable from "@/components/dashboard/ledger-table";
import { mockLedgerTransactions } from "@/lib/content/dashboard";
import type { ActivityType, TransactionStatus } from "@/types/investment";
import LedgerFilters from "@/components/dashboard/ledger-filters";

const LedgerPage = () => {
  const t = useTranslations("Ledger");
  const [typeFilter, setTypeFilter] = useState<ActivityType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">(
    "all",
  );

  const filteredTransactions = useMemo(() => {
    return mockLedgerTransactions.filter((txn) => {
      const matchesType = typeFilter === "all" || txn.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || txn.status === statusFilter;
      return matchesType && matchesStatus;
    });
  }, [typeFilter, statusFilter]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("heading")}
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">{t("subheading")}</p>
      </div>

      <RiskDisclosureBanner compact />

      <LedgerFilters
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <LedgerTable transactions={filteredTransactions} />
    </div>
  );
};

export default LedgerPage;
