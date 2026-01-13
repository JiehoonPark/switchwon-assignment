import { apiClient } from "@/shared/api";

import type { OrderRequest } from "@/entities/order";

export async function createOrder(request: OrderRequest) {
  const response = await apiClient.post<string, OrderRequest>(
    "/orders",
    request,
  );
  return response.data;
}
