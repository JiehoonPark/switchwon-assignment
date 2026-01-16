import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { getExchangeRatesLatest } from "../api/getExchangeRatesLatest";

const EXCHANGE_RATE_REFRESH_MS = 60_000;
const REFRESH_STOP_MIN_STATUS = 400;
const REFRESH_STOP_MAX_STATUS = 599;

function shouldStopRefetch(error: unknown) {
  if (!error || typeof error !== "object") return false;
  if ("response" in error) {
    const response = (error as { response?: { code?: string } }).response;
    if (response?.code && response.code !== "OK") {
      return true;
    }
  }
  if (!("status" in error)) return false;
  const status = (error as { status?: number }).status;
  if (typeof status !== "number") return false;
  return status >= REFRESH_STOP_MIN_STATUS && status <= REFRESH_STOP_MAX_STATUS;
}

export function useExchangeRatesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.exchangeRatesLatest,
    queryFn: getExchangeRatesLatest,
    refetchInterval: (query) => {
      if (query && shouldStopRefetch(query.state.error)) {
        return false;
      }
      return EXCHANGE_RATE_REFRESH_MS;
    },
  });
}
