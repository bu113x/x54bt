export function formatPrice(price: number) {
  return price >= 1
    ? price.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : `$${price.toFixed(4)}`;
}
