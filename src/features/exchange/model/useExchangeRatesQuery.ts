import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { getExchangeRatesLatest } from "../api/getExchangeRatesLatest";

const EXCHANGE_RATE_REFRESH_MS = 60_000;

export function useExchangeRatesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.exchangeRatesLatest,
    queryFn: getExchangeRatesLatest,
    refetchInterval: EXCHANGE_RATE_REFRESH_MS,
  });
}
