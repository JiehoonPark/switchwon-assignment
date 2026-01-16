import type { FormEvent } from "react";

import type { ExchangeRate } from "@/entities/exchange-rate";
import type { Currency } from "@/shared/lib";
import { cn, formatNumber } from "@/shared/lib";
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

import {
  COUNTRY_LABELS,
  CURRENCY_LABELS,
  SUPPORTED_FOREX,
} from "../model/constants";
import { useExchangeOrderForm } from "../model/useExchangeOrderForm";

type ExchangeOrderPanelProps = {
  exchangeRates?: ExchangeRate[];
  className?: string;
};

export function ExchangeOrderPanel({
  exchangeRates,
  className,
}: ExchangeOrderPanelProps) {
  const {
    amount,
    appliedRate,
    formError,
    handleSubmit,
    isBuyMode,
    isSubmitDisabled,
    isSubmitting,
    quoteDisplayText,
    setAmount,
    setMode,
    setTargetCurrency,
    targetCurrency,
  } = useExchangeOrderForm({ exchangeRates });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit();
  };

  return (
    <Card
      className={cn(
        "min-w-0 rounded-xl border border-gray-300 bg-gray-0 px-4 py-5 sm:px-6",
        className,
      )}
    >
      <div className="mb-4 flex h-8 items-center">
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
            className="rounded-md border border-gray-200 bg-white py-3 text-sm text-gray-700 shadow"
          >
            {SUPPORTED_FOREX.map((currency) => (
              <SelectItem
                key={currency}
                value={currency}
                className="w-30 px-4 py-3 text-center outline-none data-highlighted:bg-[#F7F8FA] focus:outline-none focus-visible:outline-none"
              >
                {`${COUNTRY_LABELS[currency]} ${currency}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-8 flex gap-2 rounded-2xl border border-gray-300 bg-white p-3">
        <Button
          type="button"
          onClick={() => setMode("buy")}
          className={cn(
            "h-14.75 flex-1 rounded-xl border-none text-[20px] font-bold",
            isBuyMode
              ? "bg-danger text-white shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]"
              : "bg-white text-[#FFA7A7]",
          )}
        >
          살래요
        </Button>
        <Button
          type="button"
          onClick={() => setMode("sell")}
          className={cn(
            "h-14.75 flex-1 rounded-xl border-none text-[20px] font-bold",
            isBuyMode
              ? "bg-white text-[#9DB6FF]"
              : "bg-sell-primary text-white shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]",
          )}
        >
          팔래요
        </Button>
      </div>

      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        <div className="mb-4 flex flex-col gap-2">
          <label className="text-[20px] font-medium text-gray-600">
            {isBuyMode ? "매수 금액" : "매도 금액"}
          </label>
          <div className="flex gap-2.5 rounded-xl border border-gray-700 bg-white p-6 text-[20px] text-gray-600">
            <Input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              className="flex-1 text-right font-semibold focus:outline-none"
            />
            <div className="font-medium">
              {isBuyMode
                ? `${CURRENCY_LABELS[targetCurrency]} 사기`
                : `${CURRENCY_LABELS[targetCurrency]} 팔기`}
            </div>
          </div>
        </div>

        <div className="mb-4.5 flex justify-center">
          <CircleChevronDown className="h-10 w-10 text-gray-300" />
        </div>

        <div className="mb-8 flex flex-col gap-2 pb-19">
          <div className="text-[20px] font-medium text-gray-600">
            {isBuyMode ? "필요 원화" : "받을 원화"}
          </div>
          <div className="flex gap-2.5 rounded-xl border border-[#ACB4BB] bg-gray-100 p-6">
            <div className="flex-1 text-right text-[20px] font-semibold text-gray-600">
              {quoteDisplayText}
            </div>
            <span className="shrink-0 text-[20px] font-bold text-[#3479EB]">
              원 받을 수 있어요
            </span>
          </div>
        </div>

        <div className="relative h-px w-full bg-gray-600">
          {formError && (
            <p className="absolute bottom-0 text-sm text-danger" role="alert">
              {formError}
            </p>
          )}
        </div>

        <div className="mb-8 flex justify-between text-[20px] text-gray-600">
          <span className="font-medium">적용 환율</span>
          <span className="font-semibold">
            {appliedRate
              ? `1 ${targetCurrency} = ${formatNumber(appliedRate)} 원`
              : "조회 중"}
          </span>
        </div>

        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="h-19.25 rounded-xl bg-cta text-[22px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "환전 중..." : "환전하기"}
        </Button>
      </form>
    </Card>
  );
}
