import { useQuery } from "@tanstack/react-query";

import type { OrderQuoteRequest } from "@/entities/order";
import { QUERY_KEYS } from "@/shared/config";

import { getOrderQuote } from "../api/getOrderQuote";

const EMPTY_QUOTE_KEY = ["orders", "quote", null] as const;

export function useOrderQuoteQuery(params: OrderQuoteRequest | null) {
  const queryKey = params ? QUERY_KEYS.orderQuote(params) : EMPTY_QUOTE_KEY;

  return useQuery({
    queryKey,
    queryFn: () => {
      if (!params) {
        throw new Error("Quote params are required.");
      }
      return getOrderQuote(params);
    },
    enabled: Boolean(params),
  });
}
