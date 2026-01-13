import { apiClient } from "@/shared/api";

import type { WalletSummary } from "@/entities/wallet";

export async function getWalletSummary() {
  const response = await apiClient.get<WalletSummary>("/wallets");
  return response.data;
}
