import { apiClient } from "@/shared/api";

import type { Order } from "@/entities/order";

export async function getOrders() {
  const response = await apiClient.get<Order[]>("/orders");
  return response.data;
}
