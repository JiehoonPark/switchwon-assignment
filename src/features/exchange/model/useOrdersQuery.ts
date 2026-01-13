import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { getOrders } from "../api/getOrders";

export function useOrdersQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.orders,
    queryFn: getOrders,
  });
}
