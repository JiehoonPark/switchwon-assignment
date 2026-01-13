import type { Currency } from "@/shared/lib";

export type Wallet = {
  walletId: number;
  currency: Currency;
  balance: number;
};

export type WalletSummary = {
  totalKrwBalance: number;
  wallets: Wallet[];
};
