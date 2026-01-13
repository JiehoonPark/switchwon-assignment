import type { Currency } from "@/shared/lib";

export type ExchangeRate = {
  exchangeRateId: number;
  currency: Currency;
  rate: number;
  changePercentage: number;
  applyDateTime: string;
};
