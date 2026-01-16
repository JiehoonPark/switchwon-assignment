import type { Currency } from "@/shared/lib";

export const SUPPORTED_FOREX: Currency[] = ["USD", "JPY"];

export const FOREX_LABELS: Record<Currency, string> = {
  USD: "미국 달러",
  JPY: "일본 엔화",
  KRW: "원화",
};

export const COUNTRY_LABELS: Record<Currency, string> = {
  USD: "미국",
  JPY: "일본",
  KRW: "한국",
};

export const WALLET_DISPLAY_ORDER: Currency[] = ["KRW", "USD", "JPY"];

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "달러",
  JPY: "엔화",
  KRW: "원화",
};

export const TRIANGLE_PATH =
  "M1.6 7.2 L6.2 1.8 Q7 0.8 7.8 1.8 L12.4 7.2 Q12.9 7.9 12 7.9 H2 Q1.1 7.9 1.6 7.2 Z";
