import { apiClient } from "@/shared/api";

import type { ExchangeRate } from "@/entities/exchange-rate";

export async function getExchangeRatesLatest() {
  const response = await apiClient.get<ExchangeRate[]>(
    "/exchange-rates/latest",
  );
  return response.data;
}
