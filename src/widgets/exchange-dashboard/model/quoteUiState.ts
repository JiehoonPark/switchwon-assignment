import type { ExchangeRate } from "@/entities/exchange-rate";
import type { Currency } from "@/shared/lib";

import { getQuoteDisplayText } from "./quoteDisplay";
import type { SettledQuoteState } from "./quoteState";

type QuoteUiStateParams = {
  amount: string;
  currency: Currency;
  formError: string | null;
  isQuoteFetching: boolean;
  quoteParamsKey: string | null;
  selectedRate?: ExchangeRate;
  settledState: SettledQuoteState;
  shouldShowZero: boolean;
  lastSubmitErrorInput: string | null;
};

type QuoteUiState = {
  appliedRate?: number;
  displayQuoteError: string | null;
  quoteDisplayText: string;
  shouldBlockSubmitForFormError: boolean;
  shouldBlockSubmitForQuote: boolean;
  shouldShowQuoteError: boolean;
};

export function getQuoteUiState({
  amount,
  currency,
  formError,
  isQuoteFetching,
  quoteParamsKey,
  selectedRate,
  settledState,
  shouldShowZero,
  lastSubmitErrorInput,
}: QuoteUiStateParams): QuoteUiState {
  const isMatchingSettledKey =
    Boolean(settledState.key) && settledState.key === quoteParamsKey;
  const shouldShowQuoteError = Boolean(settledState.error);
  const displayQuoteError = shouldShowQuoteError ? settledState.error : null;
  const shouldBlockSubmitForQuote =
    Boolean(settledState.error) && isMatchingSettledKey;
  const shouldBlockSubmitForFormError =
    Boolean(formError) && lastSubmitErrorInput === amount;
  const displayQuote =
    settledState.quote && !shouldShowQuoteError ? settledState.quote : null;
  const appliedRate = displayQuote?.appliedRate ?? selectedRate?.rate;
  const shouldShowPendingPlaceholder =
    Boolean(quoteParamsKey) && isQuoteFetching && !settledState.quote;
  const shouldShowPlaceholder =
    shouldShowQuoteError || shouldShowPendingPlaceholder;
  const quoteDisplayText = getQuoteDisplayText({
    shouldShowZero,
    shouldShowPlaceholder,
    quote: displayQuote,
    currency,
  });

  return {
    appliedRate,
    displayQuoteError,
    quoteDisplayText,
    shouldBlockSubmitForFormError,
    shouldBlockSubmitForQuote,
    shouldShowQuoteError,
  };
}
