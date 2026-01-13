import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { login } from "../api/login";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.walletSummary });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.exchangeRatesLatest,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders });
    },
  });
}
