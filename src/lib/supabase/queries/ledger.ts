import { createClient } from "@/lib/supabase/server";
import type {
  ActivityType,
  LedgerTransaction,
  TransactionStatus,
} from "@/types/investment";

interface LedgerRow {
  id: string;
  type: LedgerTransaction["type"];
  description: string;
  amount: number;
  status: LedgerTransaction["status"];
  reference: string;
  created_at: string;
  positions: { assets: { symbol: string } | null } | null;
}

export interface LedgerFilters {
  type?: ActivityType;
  status?: TransactionStatus;
}

export const getLedgerTransactions = async (
  filters: LedgerFilters = {},
): Promise<LedgerTransaction[]> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  let query = supabase
    .from("ledger_transactions")
    .select(
      `
      id,
      type,
      description,
      amount,
      status,
      reference,
      created_at,
      positions ( assets ( symbol ) )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (filters.type) {
    query = query.eq("type", filters.type);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query.returns<LedgerRow[]>();

  if (error || !data) {
    console.error("Failed to fetch ledger transactions:", error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    type: row.type,
    description: row.description,
    assetSymbol: row.positions?.assets?.symbol,
    amount: Number(row.amount),
    status: row.status,
    timestamp: row.created_at,
    reference: row.reference,
  }));
};
