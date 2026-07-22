import { NextResponse } from "next/server";

const apiKey = process.env.NOWPAYMENTS_API_KEY!;
const tradingWalletAddress = process.env.TRADING_WALLET_ADDRESS!;
const cronSecret = process.env.CRON_SECRET!;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // NOTE: this endpoint depends on NOWPayments' custody withdrawal/payout
  // API. Your account needs Custody + a whitelisted payout wallet set up
  // in the dashboard first — I don't have that specific endpoint's request
  // shape confirmed from what you've shared so far (the screenshots covered
  // Payments/Fiat Payouts, not the Custody balance withdrawal endpoint
  // specifically). Worth pulling up that exact section in your Postman
  // docs before wiring this call for real.
  //
  // Sketch of what this becomes once confirmed:
  //
  // const response = await fetch("https://api.nowpayments.io/v1/payout", {
  //   method: "POST",
  //   headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     withdrawals: [{ address: tradingWalletAddress, currency: "usdttrc20", amount: "<custody balance>" }],
  //   }),
  // });

  return NextResponse.json({ status: "not yet implemented — see note" });
}
