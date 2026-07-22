import { supabase } from "@/lib/supabase/client";

export interface CreateInvestmentInput {
  assetSymbol: string;
  amount: number;
}

export interface CreateInvestmentResult {
  success: boolean;
  error?: string;
}

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
