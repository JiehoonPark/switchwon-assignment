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
  const pad = (value: number) => value.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
