import type { ExchangeRate } from "@/entities/exchange-rate";
import { cn, formatNumber } from "@/shared/lib";
import { Card } from "@/shared/ui";

import { FOREX_LABELS, SUPPORTED_FOREX, TRIANGLE_PATH } from "../model/constants";

type ExchangeRateCardsProps = {
  exchangeRates?: ExchangeRate[];
  isLoading: boolean;
  className?: string;
};

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

function getChangeColor(value: number) {
  if (value > 0) return "text-danger";
  if (value < 0) return "text-sell-primary";
  return "text-gray-600";
}

export function ExchangeRateCards({
  exchangeRates,
  isLoading,
  className,
}: ExchangeRateCardsProps) {
  const rateByCurrency = new Map(
    exchangeRates?.map((rate) => [rate.currency, rate]) ?? [],
  );

  return (
    <div className={cn("grid min-w-0 gap-4 sm:grid-cols-2", className)}>
      {SUPPORTED_FOREX.map((currency) => {
        const rate = rateByCurrency.get(currency);
        return (
          <Card
            className="flex min-w-0 flex-col rounded-xl border border-gray-300 px-8 py-6"
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

            <div className="mt-2 text-2xl font-bold text-gray-800">
              {isLoading
                ? "-"
                : rate
                  ? `${formatNumber(rate.rate)} KRW`
                  : "데이터 없음"}
            </div>

            <div
              className={cn(
                "mt-1 flex items-center text-sm font-semibold",
                getChangeColor(rate?.changePercentage ?? 0),
              )}
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
  );
}
