export const CURRENCIES = ["KRW", "USD", "JPY"] as const;

export type Currency = (typeof CURRENCIES)[number];
