import { useMemo, useState } from "react";

import type { ExchangeRate } from "@/entities/exchange-rate";
import type { OrderQuoteRequest, OrderRequest } from "@/entities/order";
import { useCreateOrderMutation, useOrderQuoteQuery } from "@/features/exchange";
import type { Currency } from "@/shared/lib";
import { formatCurrency } from "@/shared/lib";

import { useDebouncedValue } from "./useDebouncedValue";

type TradeMode = "buy" | "sell";

const DEFAULT_TRADE_MODE: TradeMode = "buy";
const DEFAULT_TARGET_CURRENCY: Currency = "USD";
const KRW_CURRENCY: Currency = "KRW";
const QUOTE_DEBOUNCE_MS = 300;

type UseExchangeOrderFormParams = {
  exchangeRates?: ExchangeRate[];
};

export function useExchangeOrderForm({
  exchangeRates,
}: UseExchangeOrderFormParams) {
  const [mode, setMode] = useState<TradeMode>(DEFAULT_TRADE_MODE);
  const [targetCurrency, setTargetCurrency] = useState<Currency>(
    DEFAULT_TARGET_CURRENCY,
  );
  const [amount, setAmount] = useState("");
  const debouncedAmount = useDebouncedValue(amount, QUOTE_DEBOUNCE_MS);
  const [formError, setFormError] = useState<string | null>(null);

  const isBuyMode = mode === "buy";
  const amountValue = Number(amount);
  const isAmountValid = Number.isFinite(amountValue) && amountValue > 0;
  const quoteAmountValue = Number(debouncedAmount);
  const isQuoteAmountValid =
    Number.isFinite(quoteAmountValue) && quoteAmountValue > 0;
  const isDebouncing = amount !== debouncedAmount;

  const selectedRate = exchangeRates?.find(
    (rate) => rate.currency === targetCurrency,
  );

  const quoteParams: OrderQuoteRequest | null = useMemo(() => {
    if (!isQuoteAmountValid) return null;
    return {
      fromCurrency: isBuyMode ? KRW_CURRENCY : targetCurrency,
      toCurrency: isBuyMode ? targetCurrency : KRW_CURRENCY,
      forexAmount: quoteAmountValue,
    };
  }, [isBuyMode, isQuoteAmountValid, quoteAmountValue, targetCurrency]);

  const {
    data: quote,
    isFetching: isQuoteLoading,
    isError: isQuoteError,
  } = useOrderQuoteQuery(quoteParams);

  const { mutateAsync, isPending } = useCreateOrderMutation();

  const shouldShowError = isQuoteError && !isDebouncing;
  const shouldShowQuote = isAmountValid && quote && !shouldShowError;
  const krwAmount = shouldShowQuote ? quote.krwAmount : undefined;
  const appliedRate = shouldShowQuote
    ? quote.appliedRate
    : selectedRate?.rate;

  const quoteDisplayText = (() => {
    if (!isAmountValid) return "-";
    if (shouldShowQuote && krwAmount !== undefined) {
      return formatCurrency(krwAmount, KRW_CURRENCY);
    }
    if (shouldShowError) return "견적 조회 실패";
    if (isQuoteLoading) return "-";
    return "-";
  })();

  const handleSubmit = async () => {
    setFormError(null);

    if (!isAmountValid) {
      setFormError("금액을 입력해 주세요.");
      return;
    }
    if (!selectedRate) {
      setFormError("환율 정보를 불러오지 못했습니다.");
      return;
    }
    if (isQuoteError) {
      setFormError("견적 조회 후 다시 시도해 주세요.");
      return;
    }

    const payload: OrderRequest = {
      exchangeRateId: selectedRate.exchangeRateId,
      fromCurrency: isBuyMode ? KRW_CURRENCY : targetCurrency,
      toCurrency: isBuyMode ? targetCurrency : KRW_CURRENCY,
      forexAmount: amountValue,
    };

    try {
      await mutateAsync(payload);
      setAmount("");
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as { response?: { message?: string } };
        setFormError(apiError.response?.message ?? "환전에 실패했습니다.");
        return;
      }
      setFormError("환전에 실패했습니다.");
    }
  };

  const isSubmitDisabled =
    isPending ||
    !isAmountValid ||
    !selectedRate ||
    shouldShowError;

  return {
    amount,
    appliedRate,
    formError,
    handleSubmit,
    isBuyMode,
    isSubmitDisabled,
    isSubmitting: isPending,
    quoteDisplayText,
    setAmount,
    setMode,
    setTargetCurrency,
    targetCurrency,
  };
}
