import { useEffect, useState } from "react";

import type { OrderQuote, OrderQuoteRequest } from "@/entities/order";

export type SettledQuoteState = {
  key: string | null;
  quote: OrderQuote | null;
  error: string | null;
};

type SettledQuoteParams = {
  quoteParamsKey: string | null;
  isSettledInput: boolean;
  isQuoteFetching: boolean;
  quote: OrderQuote | undefined;
  errorMessage: string | null;
};

export function buildQuoteKey(params: OrderQuoteRequest | null) {
  if (!params) return null;
  return `${params.fromCurrency}-${params.toCurrency}-${params.forexAmount}`;
}

function isSameQuote(current: OrderQuote | null, next: OrderQuote) {
  if (!current) return false;
  return (
    current.appliedRate === next.appliedRate &&
    current.krwAmount === next.krwAmount
  );
}

export function useSettledQuoteState(params: SettledQuoteParams) {
  const [state, setState] = useState<SettledQuoteState>({
    key: null,
    quote: null,
    error: null,
  });

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!params.isSettledInput || !params.quoteParamsKey || params.isQuoteFetching) {
      return;
    }

    setState((previous) => {
      if (params.errorMessage) {
        if (
          previous.key === params.quoteParamsKey &&
          previous.error === params.errorMessage &&
          previous.quote === null
        ) {
          return previous;
        }
        return {
          key: params.quoteParamsKey,
          quote: null,
          error: params.errorMessage,
        };
      }

      if (!params.quote) return previous;
      if (
        isSameQuote(previous.quote, params.quote) &&
        previous.error === null &&
        previous.key === null
      ) {
        return previous;
      }
      return {
        key: null,
        quote: params.quote,
        error: null,
      };
    });
  }, [
    params.errorMessage,
    params.isQuoteFetching,
    params.isSettledInput,
    params.quote,
    params.quoteParamsKey,
  ]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return state;
}
