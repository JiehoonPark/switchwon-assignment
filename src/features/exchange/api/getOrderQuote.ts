import { apiClient } from "@/shared/api";

import type { OrderQuote, OrderQuoteRequest } from "@/entities/order";

export async function getOrderQuote(params: OrderQuoteRequest) {
  const searchParams = new URLSearchParams({
    fromCurrency: params.fromCurrency,
    toCurrency: params.toCurrency,
    forexAmount: params.forexAmount,
  });

  const response = await apiClient.get<OrderQuote>(
    `/orders/quote?${searchParams.toString()}`,
  );
  return response.data;
}
