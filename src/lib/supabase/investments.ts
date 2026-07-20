import { supabase } from "@/lib/supabase/client";

export interface CreateInvestmentInput {
  assetSymbol: string;
  amount: number;
}

export interface CreateInvestmentResult {
  success: boolean;
  error?: string;
}

// Wraps the actual write so the modal doesn't need to know table/RPC details.
// Backed by a Postgres function (`create_investment_position`) rather than a
// raw insert, so amount/balance validation happens server-side under
// SECURITY DEFINER — never trust the client-submitted amount alone.
export const createInvestment = async ({
  assetSymbol,
  amount,
}: CreateInvestmentInput): Promise<CreateInvestmentResult> => {
  const { error } = await supabase.rpc("create_investment_position", {
    p_asset_symbol: assetSymbol,
    p_amount: amount,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
