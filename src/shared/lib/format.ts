import type { Currency } from "./currency";

const CURRENCY_FRACTION_DIGITS: Record<Currency, number> = {
  KRW: 0,
  USD: 2,
  JPY: 0,
};

export function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export function formatCurrency(value: number, currency: Currency) {
  const fractionDigits = CURRENCY_FRACTION_DIGITS[currency];
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatDateTime(isoString: string) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
