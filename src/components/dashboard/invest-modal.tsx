"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import DepositQr from "@/components/dashboard/deposit-qr";
import CopyField from "@/components/dashboard/copy-field";
import { calculateEstimate } from "@/lib/utils";
import { useDepositStatus } from "@/lib/supabase/use-deposit-status";
import { payableCurrencies } from "@/lib/nowpayments/currencies";
import type { AssetDetail } from "@/types/investment";

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type Step = "amount" | "currency" | "deposit" | "success" | "error";

interface InvestModalProps {
  open: boolean;
  onClose: () => void;
  asset: AssetDetail;
}

const InvestModal = ({ open, onClose, asset }: InvestModalProps) => {
  const t = useTranslations("Invest");
  const [step, setStep] = useState<Step>("amount");
  const [amountInput, setAmountInput] = useState(String(asset.minInvestment));
  const [payCurrency, setPayCurrency] = useState(payableCurrencies[0].code);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [depositId, setDepositId] = useState<string | null>(null);
  const [payAddress, setPayAddress] = useState<string | null>(null);
  const [payAmount, setPayAmount] = useState<number | null>(null);

  const amount = parseFloat(amountInput) || 0;
  const isValidAmount =
    amount >= asset.minInvestment && amount <= asset.maxInvestment;
  const estimate = calculateEstimate(amount, asset);
  const depositStatus = useDepositStatus(depositId);

  const handleClose = () => {
    onClose();
    setStep("amount");
    setAmountInput(String(asset.minInvestment));
    setPayCurrency(payableCurrencies[0].code);
    setError(null);
    setDepositId(null);
    setPayAddress(null);
    setPayAmount(null);
  };

  const handleCreateDeposit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/deposits/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetSymbol: asset.symbol,
          amount,
          payCurrency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? t("genericError"));
        setStep("error");
        return;
      }

      setDepositId(data.depositId);
      setPayAddress(data.payAddress);
      setPayAmount(data.payAmount);
      setStep("deposit");
    } catch {
      setError(t("genericError"));
      setStep("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "deposit" && depositStatus === "confirmed") {
    setStep("success");
  }
  if (
    step === "deposit" &&
    (depositStatus === "failed" || depositStatus === "expired")
  ) {
    setError(t(`depositStatus.${depositStatus}`));
    setStep("error");
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t(`title.${step}`, { symbol: asset.symbol })}
    >
      {step === "amount" && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">{t("amountLabel")}</label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">
                $
              </span>
              <input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-7 pr-3 text-sm outline-none focus:border-primary"
                min={asset.minInvestment}
                max={asset.maxInvestment}
              />
            </div>
            <p className="mt-1.5 text-xs text-foreground-muted">
              {t("minMax", {
                min: formatCurrency(asset.minInvestment),
                max: formatCurrency(asset.maxInvestment),
              })}
            </p>
          </div>

          {isValidAmount && (
            <div className="rounded-lg border border-border bg-surface-elevated p-4">
              <p className="text-xs uppercase tracking-wide text-foreground-muted">
                {t("estimatedReturn")}
              </p>
              <p className="mt-1 text-sm font-medium">
                {formatCurrency(estimate.estimatedNetReturnLow)} –{" "}
                {formatCurrency(estimate.estimatedNetReturnHigh)}
              </p>
              <p className="mt-1 text-xs text-foreground-muted">
                {t("feeNote", { fee: asset.performanceFeePercent })}
              </p>
            </div>
          )}

          <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2.5">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            <p className="text-xs text-foreground-muted">{t("riskNote")}</p>
          </div>

          <Button
            onClick={() => setStep("currency")}
            disabled={!isValidAmount}
            className="w-full cursor-pointer"
          >
            {t("continue")}
          </Button>
        </div>
      )}

      {step === "currency" && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-foreground-muted">
            {t("chooseCurrencyBody")}
          </p>

          <div className="flex flex-col gap-2">
            {payableCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => setPayCurrency(currency.code)}
                className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                  payCurrency === currency.code
                    ? "border-primary bg-primary/10 font-medium text-primary"
                    : "border-border text-foreground-muted hover:bg-surface-elevated"
                }`}
              >
                {currency.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("amount")}
              className="flex-1 rounded-lg border border-border py-2.5 text-sm text-foreground-muted transition-colors hover:bg-surface-elevated cursor-pointer"
            >
              {t("back")}
            </button>
            <Button
              onClick={handleCreateDeposit}
              disabled={isSubmitting}
              className="flex-1 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("processing")}
                </span>
              ) : (
                t("continue")
              )}
            </Button>
          </div>
        </div>
      )}

      {step === "deposit" && payAddress && (
        <div className="flex flex-col gap-4">
          <DepositQr value={payAddress} />

          <div>
            <p className="text-xs uppercase tracking-wide text-foreground-muted">
              {t("sendExactly")}
            </p>
            <p className="mt-1 text-lg font-semibold">
              {payAmount} {payCurrency.toUpperCase()}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-foreground-muted">
              {t("depositAddress")}
            </p>
            <div className="mt-1.5">
              <CopyField value={payAddress} />
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-lg border border-border bg-surface-elevated px-3 py-2.5">
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
            <p className="text-xs text-foreground-muted">
              {t(`depositStatus.${depositStatus}`)}
            </p>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2.5">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            <p className="text-xs text-foreground-muted">
              {t("depositRiskNote")}
            </p>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-6 w-6 text-success" />
          </span>
          <p className="font-medium">{t("successHeading")}</p>
          <p className="text-sm text-foreground-muted">
            {t("successBody", {
              amount: formatCurrency(amount),
              symbol: asset.symbol,
            })}
          </p>
          <Button onClick={handleClose} className="mt-2 w-full cursor-pointer">
            {t("done")}
          </Button>
        </div>
      )}

      {step === "error" && (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
            <AlertTriangle className="h-6 w-6 text-danger" />
          </span>
          <p className="font-medium">{t("errorHeading")}</p>
          <p className="text-sm text-foreground-muted">{error}</p>
          <Button
            onClick={() => setStep("amount")}
            className="mt-2 w-full cursor-pointer"
          >
            {t("tryAgain")}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default InvestModal;
