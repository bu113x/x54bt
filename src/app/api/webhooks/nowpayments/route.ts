import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";
import {
  notifyDepositConfirmed,
  notifyInvestmentCreated,
} from "@/lib/notifications/investment-emails";

const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET!;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const sortObjectKeys = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  return Object.keys(obj)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = obj[key];
        return acc;
      },
      {} as Record<string, unknown>,
    );
};

const verifySignature = (
  body: Record<string, unknown>,
  signature: string,
): boolean => {
  const sortedBody = JSON.stringify(sortObjectKeys(body));
  const expectedSignature = createHmac("sha512", ipnSecret)
    .update(sortedBody)
    .digest("hex");

  const expected = Buffer.from(expectedSignature);
  const received = Buffer.from(signature);

  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
};

export async function POST(request: Request) {
  const signature = request.headers.get("x-nowpayments-sig");
  const rawBody = await request.json();

  if (!signature || !verifySignature(rawBody, signature)) {
    console.error("Invalid NOWPayments IPN signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { payment_id, payment_status, actually_paid } = rawBody;

  const { data: deposit, error: fetchError } = await supabaseAdmin
    .from("crypto_deposits")
    .select(
      "id, user_id, status, position_id, price_amount, pay_currency, asset_id",
    )
    .eq("nowpayments_payment_id", payment_id)
    .single();

  if (fetchError || !deposit) {
    console.error("Deposit not found for payment:", payment_id);
    return NextResponse.json({ received: true });
  }

  const wasAlreadyConfirmed =
    deposit.status === "confirmed" || deposit.position_id;

  await supabaseAdmin
    .from("crypto_deposits")
    .update({ status: payment_status, actually_paid })
    .eq("id", deposit.id);

  if (payment_status === "confirmed" && !deposit.position_id) {
    const { data: user } = await supabaseAdmin.auth.admin.getUserById(
      deposit.user_id,
    );
    const investorEmail = user?.user?.email;

    if (!wasAlreadyConfirmed && investorEmail) {
      await notifyDepositConfirmed({
        investorEmail,
        amountUsd: deposit.price_amount,
        payCurrency: deposit.pay_currency,
      });
    }

    const { error: rpcError } = await supabaseAdmin.rpc(
      "create_investment_from_deposit",
      { p_deposit_id: deposit.id },
    );

    if (rpcError) {
      console.error("Failed to create investment from deposit:", rpcError);
      return NextResponse.json({ received: true });
    }

    if (investorEmail) {
      const { data: asset } = await supabaseAdmin
        .from("assets")
        .select("symbol")
        .eq("id", deposit.asset_id)
        .single();

      await notifyInvestmentCreated({
        investorEmail,
        assetSymbol: asset?.symbol ?? "your asset",
        amountUsd: deposit.price_amount,
      });
    }
  }

  return NextResponse.json({ received: true });
}
