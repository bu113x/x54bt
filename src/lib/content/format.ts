export function formatPrice(price: number) {
  return price >= 1
    ? price.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : `$${price.toFixed(4)}`;
}

export const formatDate = (iso: string, locale: string) =>
  new Date(iso).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const formatCurrency = (value: number) => {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
