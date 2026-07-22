const baseUrl = process.env.NOWPAYMENTS_BASE_URL!;
const apiKey = process.env.NOWPAYMENTS_API_KEY!;

if (!apiKey) {
  console.warn("NOWPAYMENTS_API_KEY is not set. Deposits will not work.");
}

const nowpaymentsFetch = async <T>(
  path: string,
  init: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "x-api-key": apiKey ?? "",
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`NOWPayments request failed (${response.status}): ${body}`);
  }

  return (await response.json()) as T;
};

export interface MinAmountResponse {
  currency_from: string;
  currency_to: string;
  min_amount: number;
  fiat_equivalent?: number;
}

export const getMinimumAmount = (
  payCurrency: string,
  priceCurrency: string = "usd",
): Promise<MinAmountResponse> =>
  nowpaymentsFetch(
    `/min-amount?currency_from=${payCurrency}&currency_to=${payCurrency}&fiat_equivalent=${priceCurrency}`,
  );

export interface EstimatePriceResponse {
  currency_from: string;
  amount_from: number;
  currency_to: string;
  estimated_amount: number;
}

export const getEstimatedPrice = (
  amount: number,
  priceCurrency: string,
  payCurrency: string,
): Promise<EstimatePriceResponse> =>
  nowpaymentsFetch(
    `/estimate?amount=${amount}&currency_from=${priceCurrency}&currency_to=${payCurrency}`,
  );

export interface CreatePaymentInput {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  order_id: string;
  order_description: string;
  ipn_callback_url: string;
  payout_currency?: string;
  payout_address?: string;
}

export interface CreatePaymentResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id: string;
}

export const createPayment = (
  input: CreatePaymentInput,
): Promise<CreatePaymentResponse> =>
  nowpaymentsFetch("/payment", {
    method: "POST",
    body: JSON.stringify(input),
  });

export interface PaymentStatusResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  actually_paid: number;
  pay_amount: number;
  pay_currency: string;
}

export const getPaymentStatus = (
  paymentId: string,
): Promise<PaymentStatusResponse> => nowpaymentsFetch(`/payment/${paymentId}`);
