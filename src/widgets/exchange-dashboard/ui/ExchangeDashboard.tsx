"use client";

import {
  useExchangeRatesQuery,
  useWalletSummaryQuery,
} from "@/features/exchange";

import { ExchangeOrderPanel } from "./ExchangeOrderPanel";
import { ExchangeRateCards } from "./ExchangeRateCards";
import { WalletSummaryCard } from "./WalletSummaryCard";

export function ExchangeDashboard() {
  const { data: exchangeRates, isLoading: isRatesLoading } =
    useExchangeRatesQuery();
  const { data: walletSummary, isLoading: isWalletLoading } =
    useWalletSummaryQuery();

  return (
    <section className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,1fr)] lg:grid-rows-[auto_minmax(0,1fr)] lg:items-stretch">
      <ExchangeRateCards
        exchangeRates={exchangeRates}
        isLoading={isRatesLoading}
        className="lg:col-start-1 lg:row-start-1"
      />
      <WalletSummaryCard
        walletSummary={walletSummary}
        isLoading={isWalletLoading}
        className="lg:col-start-1 lg:row-start-2 lg:h-full"
      />
      <ExchangeOrderPanel
        exchangeRates={exchangeRates}
        className="lg:col-start-2 lg:row-span-2 lg:h-full"
      />
    </section>
  );
}
