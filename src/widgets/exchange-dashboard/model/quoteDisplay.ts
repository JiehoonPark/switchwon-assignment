import type { OrderQuote } from "@/entities/order";
import type { Currency } from "@/shared/lib";
import { formatCurrency } from "@/shared/lib";

type QuoteDisplayParams = {
  shouldShowZero: boolean;
  shouldShowPlaceholder: boolean;
  quote: OrderQuote | null;
  currency: Currency;
};

export function getQuoteDisplayText({
  shouldShowZero,
  shouldShowPlaceholder,
  quote,
  currency,
}: QuoteDisplayParams) {
  if (shouldShowZero) return "0";
  if (shouldShowPlaceholder) return "-";
  const krwAmount = quote?.krwAmount;
  if (typeof krwAmount === "number") {
    return formatCurrency(krwAmount, currency);
  }
  return "0";
}
