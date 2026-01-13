type OrderQuoteKeyParams = {
  fromCurrency: string;
  toCurrency: string;
  forexAmount: number;
};

export const QUERY_KEYS = {
  exchangeRatesLatest: ["exchange-rates", "latest"] as const,
  walletSummary: ["wallets", "summary"] as const,
  orders: ["orders"] as const,
  orderQuote: (params: OrderQuoteKeyParams) =>
    ["orders", "quote", params] as const,
};
