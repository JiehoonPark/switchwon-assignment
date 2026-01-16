import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { OrderQuote, OrderQuoteRequest } from "@/entities/order";
import { QUERY_KEYS } from "@/shared/config";
import type { ApiError } from "@/shared/api";

import { getOrderQuote } from "../api/getOrderQuote";

const EMPTY_QUOTE_KEY = ["orders", "quote", null] as const;
const MAX_RETRY_COUNT = 2;

function isClientError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  if ("response" in error) {
    const response = (error as { response?: { code?: string } }).response;
    if (response?.code && response.code !== "OK") {
      return true;
    }
  }
  if (!("status" in error)) return false;
  const payload = error as { status?: unknown };
  if (typeof payload.status !== "number") return false;
  return payload.status >= 400 && payload.status < 500;
}

export function useOrderQuoteQuery(params: OrderQuoteRequest | null) {
  const queryKey = params ? QUERY_KEYS.orderQuote(params) : EMPTY_QUOTE_KEY;

  return useQuery<
    OrderQuote,
    ApiError<unknown>,
    OrderQuote,
    ReturnType<typeof QUERY_KEYS.orderQuote> | typeof EMPTY_QUOTE_KEY
  >({
    queryKey,
    queryFn: async () => {
      if (!params) {
        throw new Error("Quote params are required.");
      }
      return getOrderQuote(params);
    },
    enabled: Boolean(params),
    placeholderData: keepPreviousData,
    retry: (failureCount, error) => {
      if (isClientError(error)) {
        return false;
      }
      return failureCount < MAX_RETRY_COUNT;
    },
  });
}
