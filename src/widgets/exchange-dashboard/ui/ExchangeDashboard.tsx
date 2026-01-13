"use client";

import type { ReactNode } from "react";

import { useExchangeRatesQuery, useWalletSummaryQuery } from "@/features/exchange";

type ExchangeDashboardProps = {
  children?: ReactNode;
};

export function ExchangeDashboard({ children }: ExchangeDashboardProps) {
  const { data: exchangeRates } = useExchangeRatesQuery();
  const { data: walletSummary } = useWalletSummaryQuery();

  return (
    <section
      data-slot="exchange-dashboard"
      data-has-exchange-rates={Boolean(exchangeRates)}
      data-has-wallet-summary={Boolean(walletSummary)}
    >
      {children}
    </section>
  );
}
