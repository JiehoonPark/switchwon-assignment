import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { getOrders } from "../api/getOrders";

export function useOrdersQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.orders,
    queryFn: getOrders,
    select: (orders) =>
      [...orders].sort(
        (a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime()
      ),
  });
}
