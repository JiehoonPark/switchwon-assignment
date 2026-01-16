import { useMemo, useState } from "react";

import type { ExchangeRate } from "@/entities/exchange-rate";
import type { OrderQuoteRequest, OrderRequest } from "@/entities/order";
import {
  useCreateOrderMutation,
  useOrderQuoteQuery,
} from "@/features/exchange";
import type { Currency } from "@/shared/lib";

import { useDebouncedValue } from "./useDebouncedValue";
import { getApiErrorMessage, isUnauthorizedError } from "./errorHandling";
import {
  isExceedingMaxIntegerDigits,
  normalizeAmountInput,
} from "./inputFormat";
import { buildQuoteKey, useSettledQuoteState } from "./quoteState";
import { getQuoteUiState } from "./quoteUiState";
import { useFormErrors } from "./useFormErrors";

type TradeMode = "buy" | "sell";

const DEFAULT_TRADE_MODE: TradeMode = "buy";
const DEFAULT_TARGET_CURRENCY: Currency = "USD";
const KRW_CURRENCY: Currency = "KRW";
const QUOTE_DEBOUNCE_MS = 300;
const ZERO_AMOUNT = "0";
const MAX_AMOUNT_INTEGER_DIGITS = 13;

type UseExchangeOrderFormParams = {
  exchangeRates?: ExchangeRate[];
  exchangeRatesError?: unknown;
};

export function useExchangeOrderForm({
  exchangeRates,
  exchangeRatesError,
}: UseExchangeOrderFormParams) {
  const [mode, setMode] = useState<TradeMode>(DEFAULT_TRADE_MODE);
  const [targetCurrency, setTargetCurrency] = useState<Currency>(
    DEFAULT_TARGET_CURRENCY
  );
  const [amount, setAmountState] = useState(ZERO_AMOUNT);
  const debouncedAmount = useDebouncedValue(amount, QUOTE_DEBOUNCE_MS);
  const [hasInteracted, setHasInteracted] = useState(false);
  const {
    clearFormError,
    formError,
    lastSubmitErrorInput,
    resetFormErrors,
    resetSubmitErrorOnAmountChange,
    setFormError,
    setLastSubmitErrorInput,
  } = useFormErrors();
  const isBuyMode = mode === "buy";
  const amountValue = Number(amount);
  const debouncedAmountValue = Number(debouncedAmount);
  const isDebouncedAmountValid =
    Number.isFinite(debouncedAmountValue) && debouncedAmountValue > 0;
  const shouldShowZero = !hasInteracted || !isDebouncedAmountValid;
  const isQuoteAmountValid = hasInteracted && isDebouncedAmountValid;

  const selectedRate = exchangeRates?.find(
    (rate) => rate.currency === targetCurrency
  );

  const quoteParams: OrderQuoteRequest | null = useMemo(() => {
    if (!isQuoteAmountValid) return null;
    return {
      fromCurrency: isBuyMode ? KRW_CURRENCY : targetCurrency,
      toCurrency: isBuyMode ? targetCurrency : KRW_CURRENCY,
      forexAmount: debouncedAmount,
    };
  }, [debouncedAmount, isBuyMode, isQuoteAmountValid, targetCurrency]);

  const {
    data: quote,
    error: quoteError,
    isFetching: isQuoteFetching,
  } = useOrderQuoteQuery(quoteParams);

  const { mutateAsync, isPending } = useCreateOrderMutation();

  const isSettledInput = amount === debouncedAmount;
  const currentQuoteErrorMessage = getApiErrorMessage(quoteError);
  const quoteParamsKey = buildQuoteKey(quoteParams);
  const settledState = useSettledQuoteState({
    quoteParamsKey,
    isSettledInput,
    isQuoteFetching,
    quote,
    errorMessage: currentQuoteErrorMessage,
  });
  const {
    appliedRate,
    displayQuoteError,
    quoteDisplayText,
    shouldBlockSubmitForFormError,
    shouldBlockSubmitForQuote,
    shouldShowQuoteError,
  } = getQuoteUiState({
    amount,
    currency: KRW_CURRENCY,
    formError,
    isQuoteFetching,
    quoteParamsKey,
    selectedRate,
    settledState,
    shouldShowZero,
    lastSubmitErrorInput,
  });

  const handleAmountChange = (value: string) => {
    const normalized = normalizeAmountInput(value, ZERO_AMOUNT);
    if (isExceedingMaxIntegerDigits(normalized, MAX_AMOUNT_INTEGER_DIGITS)) {
      return;
    }
    setAmountState(normalized);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    resetSubmitErrorOnAmountChange(normalized);
    clearFormError();
  };

  const handleModeChange = (nextMode: TradeMode) => {
    setMode(nextMode);
    resetFormErrors();
  };

  const handleCurrencyChange = (nextCurrency: Currency) => {
    setTargetCurrency(nextCurrency);
    resetFormErrors();
  };

  const handleSubmit = async () => {
    setFormError(null);

    if (!Number.isFinite(amountValue)) {
      return;
    }
    if (!selectedRate) {
      const errorMessage = getApiErrorMessage(exchangeRatesError);
      if (errorMessage) {
        setFormError(errorMessage);
        setLastSubmitErrorInput(amount);
      }
      return;
    }

    const payload: OrderRequest = {
      exchangeRateId: selectedRate.exchangeRateId,
      fromCurrency: isBuyMode ? KRW_CURRENCY : targetCurrency,
      toCurrency: isBuyMode ? targetCurrency : KRW_CURRENCY,
      forexAmount: amount,
    };

    try {
      await mutateAsync(payload);
      setAmountState(ZERO_AMOUNT);
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      if (errorMessage) {
        setFormError(errorMessage);
        setLastSubmitErrorInput(amount);
      }
    }
  };

  const isSubmitDisabled =
    isPending ||
    shouldBlockSubmitForQuote ||
    shouldBlockSubmitForFormError ||
    isUnauthorizedError(quoteError) ||
    isUnauthorizedError(exchangeRatesError);

  return {
    amount,
    appliedRate,
    formError: formError ?? (shouldShowQuoteError ? displayQuoteError : null),
    handleSubmit,
    isBuyMode,
    isSubmitDisabled,
    isSubmitting: isPending,
    quoteDisplayText,
    setAmount: handleAmountChange,
    setMode: handleModeChange,
    setTargetCurrency: handleCurrencyChange,
    targetCurrency,
  };
}
