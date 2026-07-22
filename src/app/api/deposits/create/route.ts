import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  createPayment,
  getEstimatedPrice,
  getMinimumAmount,
} from "@/lib/nowpayments/client";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { assetSymbol, amount, payCurrency } = await request.json();

  if (!assetSymbol || !amount || !payCurrency) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const { data: asset, error: assetError } = await supabase
    .from("assets")
    .select("id, symbol, min_investment, max_investment")
    .eq("symbol", assetSymbol)
    .eq("is_active", true)
    .single();

  if (assetError || !asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  if (amount < asset.min_investment || amount > asset.max_investment) {
    return NextResponse.json(
      {
        error: `Amount must be between ${asset.min_investment} and ${asset.max_investment}`,
      },
      { status: 400 },
    );
  }

  try {
    const minAmount = await getMinimumAmount(payCurrency);
    const estimate = await getEstimatedPrice(amount, "usd", payCurrency);

    if (estimate.estimated_amount < minAmount.min_amount) {
      return NextResponse.json(
        {
          error: "Amount is below the minimum payable amount for this currency",
        },
        { status: 400 },
      );
    }

    const orderId = `INV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const payment = await createPayment({
      price_amount: amount,
      price_currency: "usd",
      pay_currency: payCurrency,
      order_id: orderId,
      order_description: `Investment in ${asset.symbol}`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/nowpayments`,
      payout_currency: process.env.TRADING_WALLET_PAYOUT_CURRENCY,
      payout_address: process.env.TRADING_WALLET_ADDRESS,
    });

    const { data: deposit, error: insertError } = await supabase
      .from("crypto_deposits")
      .insert({
        user_id: user.id,
        asset_id: asset.id,
        nowpayments_payment_id: payment.payment_id,
        pay_currency: payment.pay_currency,
        pay_address: payment.pay_address,
        price_amount: payment.price_amount,
        pay_amount: payment.pay_amount,
        status: "waiting",
      })
      .select()
      .single();

    if (insertError || !deposit) {
      console.error("Failed to record deposit:", insertError);
      return NextResponse.json(
        { error: "Failed to record deposit" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      depositId: deposit.id,
      payAddress: payment.pay_address,
      payAmount: payment.pay_amount,
      payCurrency: payment.pay_currency,
    });
  } catch (error) {
    console.error("NOWPayments deposit creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create deposit" },
      { status: 500 },
    );
  }
}
