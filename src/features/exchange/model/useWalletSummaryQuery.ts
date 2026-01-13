import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { getWalletSummary } from "../api/getWalletSummary";

export function useWalletSummaryQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.walletSummary,
    queryFn: getWalletSummary,
  });
}
