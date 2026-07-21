// src/app/[locale]/(dashboard)/ledger/page.tsx
import { getTranslations } from "next-intl/server";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import LedgerFilters from "@/components/dashboard/ledger-filters";
import LedgerTable from "@/components/dashboard/ledger-table";
import { getLedgerTransactions } from "@/lib/supabase/queries/ledger";
import type { ActivityType, TransactionStatus } from "@/types/investment";

interface LedgerPageProps {
  searchParams: Promise<{ type?: string; status?: string }>;
}

const LedgerPage = async ({ searchParams }: LedgerPageProps) => {
  const t = await getTranslations("Ledger");
  const params = await searchParams;

  const typeFilter = params.type as ActivityType | undefined;
  const statusFilter = params.status as TransactionStatus | undefined;

  const transactions = await getLedgerTransactions({
    type: typeFilter,
    status: statusFilter,
  });

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
        typeFilter={typeFilter ?? "all"}
        statusFilter={statusFilter ?? "all"}
      />

      <LedgerTable transactions={transactions} />
    </div>
  );
};

export default LedgerPage;
