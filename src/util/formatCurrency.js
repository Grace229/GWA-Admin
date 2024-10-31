export default function currencyFormat(price, currency = "ngn") {
  let value = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
  });
  return value.format(price);
}
