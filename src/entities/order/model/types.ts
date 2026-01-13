import type { Currency } from "@/shared/lib";

export type Order = {
  orderId: number;
  fromCurrency: Currency;
  fromAmount: number;
  toCurrency: Currency;
  toAmount: number;
  appliedRate: number;
  orderedAt: string;
};

export type OrderRequest = {
  exchangeRateId: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  forexAmount: number;
};

export type OrderQuoteRequest = {
  fromCurrency: Currency;
  toCurrency: Currency;
  forexAmount: number;
};

export type OrderQuote = {
  krwAmount: number;
  appliedRate: number;
};
