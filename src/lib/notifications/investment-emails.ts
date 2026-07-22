import { sendEmail } from "@/lib/sendbyte/client";

const fromAddress = process.env.SENDBYTE_FROM_EMAIL!;
const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface DepositConfirmedInput {
  investorEmail: string;
  amountUsd: number;
  payCurrency: string;
}

export const notifyDepositConfirmed = async ({
  investorEmail,
  amountUsd,
  payCurrency,
}: DepositConfirmedInput) => {
  await sendEmail({
    from: fromAddress,
    to: investorEmail,
    subject: "Your deposit has been confirmed",
    html: `
      <p>Your deposit of ${formatCurrency(amountUsd)} (paid in ${payCurrency.toUpperCase()}) has been confirmed on the blockchain.</p>
      <p>We're now opening your investment position — you'll receive a separate confirmation shortly.</p>
    `,
  });

  if (adminEmail) {
    await sendEmail({
      from: fromAddress,
      to: adminEmail,
      subject: "Deposit confirmed",
      html: `
        <p>Deposit confirmed for ${investorEmail}: ${formatCurrency(amountUsd)} via ${payCurrency.toUpperCase()}.</p>
      `,
    });
  }
};

interface InvestmentCreatedInput {
  investorEmail: string;
  assetSymbol: string;
  amountUsd: number;
}

export const notifyInvestmentCreated = async ({
  investorEmail,
  assetSymbol,
  amountUsd,
}: InvestmentCreatedInput) => {
  await sendEmail({
    from: fromAddress,
    to: investorEmail,
    subject: "Your investment is now active",
    html: `
      <p>Your investment of ${formatCurrency(amountUsd)} in ${assetSymbol} is now active.</p>
      <p>You can track its performance any time from your Portfolio page.</p>
    `,
  });

  if (adminEmail) {
    await sendEmail({
      from: fromAddress,
      to: adminEmail,
      subject: "New investment created",
      html: `
        <p>New position opened for ${investorEmail}: ${formatCurrency(amountUsd)} in ${assetSymbol}.</p>
      `,
    });
  }
};
