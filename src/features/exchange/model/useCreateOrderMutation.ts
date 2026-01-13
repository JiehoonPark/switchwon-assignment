import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { createOrder } from "../api/createOrder";

const AFTER_ORDER_KEYS = [QUERY_KEYS.walletSummary, QUERY_KEYS.orders];

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      AFTER_ORDER_KEYS.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });
}
