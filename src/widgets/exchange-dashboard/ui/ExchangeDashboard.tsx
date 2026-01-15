"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import type { OrderQuoteRequest } from "@/entities/order";
import {
  useCreateOrderMutation,
  useExchangeRatesQuery,
  useOrderQuoteQuery,
  useWalletSummaryQuery,
} from "@/features/exchange";
import type { Currency } from "@/shared/lib";
import { formatCurrency, formatNumber } from "@/shared/lib";
import {
  Button,
  Card,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui";
import { ChevronDown, CircleChevronDown } from "lucide-react";

const SUPPORTED_FOREX: Currency[] = ["USD", "JPY"];
const FOREX_LABELS: Record<Currency, string> = {
  USD: "미국 달러",
  JPY: "일본 엔화",
  KRW: "원화",
};
const COUNTRY_LABELS: Record<Currency, string> = {
  USD: "미국",
  JPY: "일본",
  KRW: "한국",
};

const WALLET_DISPLAY_ORDER: Currency[] = ["KRW", "USD", "JPY"];
const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "달러",
  JPY: "엔화",
  KRW: "원화",
};

type TradeMode = "buy" | "sell";

const TRIANGLE_PATH =
  "M1.6 7.2 L6.2 1.8 Q7 0.8 7.8 1.8 L12.4 7.2 Q12.9 7.9 12 7.9 H2 Q1.1 7.9 1.6 7.2 Z";

function TriangleUpIcon() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center">
      <svg aria-hidden viewBox="0 0 14 8" className="h-2 w-3.5">
        <path d={TRIANGLE_PATH} fill="currentColor" />
      </svg>
    </span>
  );
}

function TriangleDownIcon() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center">
      <svg aria-hidden viewBox="0 0 14 8" className="h-2 w-3.5">
        <path
          d={TRIANGLE_PATH}
          fill="currentColor"
          transform="rotate(180 7 4)"
        />
      </svg>
    </span>
  );
}

export function ExchangeDashboard() {
  const [mode, setMode] = useState<TradeMode>("buy");
  const [targetCurrency, setTargetCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { data: exchangeRates, isLoading: isRatesLoading } =
    useExchangeRatesQuery();
  const { data: walletSummary, isLoading: isWalletLoading } =
    useWalletSummaryQuery();

  const selectedRate = exchangeRates?.find(
    (rate) => rate.currency === targetCurrency
  );

  const numericAmount = Number(amount);
  const isAmountValid = Number.isFinite(numericAmount) && numericAmount > 0;

  const quoteParams: OrderQuoteRequest | null = useMemo(() => {
    if (!isAmountValid) return null;
    if (mode === "buy") {
      return {
        fromCurrency: "KRW",
        toCurrency: targetCurrency,
        forexAmount: numericAmount,
      };
    }
    return {
      fromCurrency: targetCurrency,
      toCurrency: "KRW",
      forexAmount: numericAmount,
    };
  }, [isAmountValid, mode, numericAmount, targetCurrency]);

  const {
    data: quote,
    isFetching: isQuoteLoading,
    isError: isQuoteError,
  } = useOrderQuoteQuery(quoteParams);

  const { mutateAsync, isPending } = useCreateOrderMutation();

  const shouldShowQuote = isAmountValid && quote && !isQuoteError;
  const appliedRate = shouldShowQuote ? quote.appliedRate : selectedRate?.rate;
  const krwAmount = shouldShowQuote ? quote.krwAmount : undefined;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    const payload =
      mode === "buy"
        ? {
            exchangeRateId: selectedRate.exchangeRateId,
            fromCurrency: "KRW" as const,
            toCurrency: targetCurrency,
            forexAmount: numericAmount,
          }
        : {
            exchangeRateId: selectedRate.exchangeRateId,
            fromCurrency: targetCurrency,
            toCurrency: "KRW" as const,
            forexAmount: numericAmount,
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

  const renderChangeColor = (value: number) => {
    if (value > 0) return "text-danger";
    if (value < 0) return "text-sell-primary";
    return "text-gray-600";
  };

  return (
    <section className="flex gap-6 h-196.75">
      <div className="flex flex-col flex-1 gap-5">
        <div className="w-full flex flex-1 gap-5">
          {SUPPORTED_FOREX.map((currency) => {
            const rate = exchangeRates?.find(
              (item) => item.currency === currency
            );
            return (
              <Card
                className="flex flex-col w-76 h-35.75 border border-gray-300 px-8 py-6 rounded-xl"
                key={currency}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-600">
                    {currency}
                  </span>
                  <div className="text-sm text-gray-600">
                    {FOREX_LABELS[currency]}
                  </div>
                </div>

                <div className="text-2xl font-bold text-gray-800 mt-2">
                  {isRatesLoading
                    ? "-"
                    : rate
                    ? `${formatNumber(rate.rate)} KRW`
                    : "데이터 없음"}
                </div>

                <div
                  className={`flex items-center text-sm font-semibold mt-1 ${renderChangeColor(
                    rate?.changePercentage ?? 0
                  )}`}
                >
                  {rate && (
                    <div className="inline-flex items-center gap-1">
                      {rate.changePercentage > 0 && (
                        <>
                          <TriangleUpIcon />
                          <span>+</span>
                        </>
                      )}
                      {rate.changePercentage < 0 && (
                        <>
                          <TriangleDownIcon />
                          <span>-</span>
                        </>
                      )}
                      <span>{Math.abs(rate.changePercentage).toFixed(2)}%</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="flex flex-col w-full h-full rounded-xl border bg-gray-0 px-8 py-6 border-gray-300">
          <h2 className="text-[24px] font-extrabold text-gray-800 mb-8">
            내 지갑
          </h2>

          <div className="flex flex-col gap-3">
            {WALLET_DISPLAY_ORDER.map((currency) => {
              const balance = walletSummary?.wallets.find(
                (wallet) => wallet.currency === currency
              )?.balance;
              return (
                <div
                  key={currency}
                  className="flex items-center justify-between text-[20px] text-gray-600"
                >
                  <span className="font-medium">{currency}</span>
                  <span className="font-semibold">
                    {isWalletLoading || typeof balance === "undefined"
                      ? "-"
                      : formatCurrency(balance, currency as Currency)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-gray-300 text-[20px] pt-5 pb-2 mt-auto">
            <span className="font-semibold text-gray-600">총 보유 자산</span>
            <span className="font-bold text-blue-500">
              {walletSummary
                ? formatCurrency(walletSummary.totalKrwBalance, "KRW")
                : "-"}
            </span>
          </div>
        </Card>
      </div>

      <Card className="flex-1 rounded-xl border border-gray-300 bg-gray-0 px-6 py-5">
        <div className="flex items-center h-8 mb-4">
          <Select
            value={targetCurrency}
            onValueChange={(value) => setTargetCurrency(value as Currency)}
          >
            <SelectTrigger className="group flex items-center gap-2 text-[20px] font-bold text-cta-1 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
              <span>{`${targetCurrency} 환전하기`}</span>
              <ChevronDown
                aria-hidden
                className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              sideOffset={4}
              className="rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow py-3"
            >
              {SUPPORTED_FOREX.map((currency) => (
                <SelectItem
                  key={currency}
                  value={currency}
                  className="px-4 py-3 data-highlighted:bg-[#F7F8FA] w-30 outline-none focus:outline-none focus-visible:outline-none text-center"
                >
                  {`${COUNTRY_LABELS[currency]} ${currency}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 rounded-2xl border border-gray-300 p-3 bg-white mb-8">
          <Button
            type="button"
            onClick={() => setMode("buy")}
            className={`flex-1 rounded-xl border h-14.75 text-[20px] font-bold border-none ${
              mode === "buy"
                ? "bg-danger text-white shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]"
                : "bg-white text-[#FFA7A7]"
            }`}
          >
            살래요
          </Button>
          <Button
            type="button"
            onClick={() => setMode("sell")}
            className={`flex-1 rounded-xl h-14.75 text-[20px] font-bold border-none ${
              mode === "sell"
                ? "bg-sell-primary text-white shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]"
                : "bg-white text-[#9DB6FF]"
            }`}
          >
            팔래요
          </Button>
        </div>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-[20px] text-gray-600 font-medium">
              {mode === "buy" ? "매수 금액" : "매도 금액"}
            </label>
            <div className="flex gap-2.5 rounded-xl border border-gray-700 p-6 text-gray-600 bg-white text-[20px] ">
              <Input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                inputMode="decimal"
                className="flex-1 font-semibold text-right focus:outline-none"
              />
              <div className="font-medium">
                {mode === "buy"
                  ? `${CURRENCY_LABELS[targetCurrency]} 사기`
                  : `${CURRENCY_LABELS[targetCurrency]} 팔기`}
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-4.5">
            <CircleChevronDown className="text-gray-300 w-10 h-10" />
          </div>

          <div className="flex flex-col gap-2 pb-19 mb-8">
            <div className="text-[20px] font-medium text-gray-600">
              {mode === "buy" ? "필요 원화" : "받을 원화"}
            </div>
            <div className="flex gap-2.5 bg-gray-100 border border-[#ACB4BB] p-6 rounded-xl">
              <div className="flex-1 text-right text-gray-600 font-semibold text-[20px]">
                {shouldShowQuote && krwAmount !== undefined
                  ? formatCurrency(krwAmount, "KRW")
                  : isQuoteError
                  ? "견적 조회 실패"
                  : isQuoteLoading && isAmountValid
                  ? ""
                  : "0"}
              </div>
              <span className="text-[#3479EB] font-bold text-[20px] shrink-0">
                원 받을 수 있어요
              </span>
            </div>
          </div>

          <div className="relative w-full h-px bg-gray-600">
            {formError && (
              <p className="absolute bottom-0 text-sm text-danger" role="alert">
                {formError}
              </p>
            )}
          </div>

          <div className="flex justify-between text-[20px] text-gray-600 mb-8">
            <span className="font-medium">적용 환율</span>
            <span className="font-semibold">
              {appliedRate
                ? `1 ${targetCurrency} = ${formatNumber(appliedRate)} 원`
                : "조회 중"}
            </span>
          </div>

          <Button
            type="submit"
            disabled={
              isPending ||
              isQuoteLoading ||
              isQuoteError ||
              !isAmountValid ||
              !selectedRate
            }
            className="rounded-xl bg-cta h-19.25 text-[22px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "환전 중..." : "환전하기"}
          </Button>
        </form>
      </Card>
    </section>
  );
}
