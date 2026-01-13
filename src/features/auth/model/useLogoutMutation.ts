import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { logout } from "../api/logout";

const PROTECTED_QUERY_KEYS = [
  QUERY_KEYS.walletSummary,
  QUERY_KEYS.exchangeRatesLatest,
  QUERY_KEYS.orders,
];

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      PROTECTED_QUERY_KEYS.forEach((queryKey) => {
        queryClient.removeQueries({ queryKey });
      });
    },
  });
}
