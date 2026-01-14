"use client";

import type { ReactNode } from "react";

import { useOrdersQuery } from "@/features/exchange";
import { OrderHistoryEmpty } from "./OrderHistoryEmpty";
import { OrderHistoryError } from "./OrderHistoryError";
import { OrderHistorySkeleton } from "./OrderHistorySkeleton";
import { OrderHistoryTable } from "./OrderHistoryTable";

export function OrderHistory() {
  const { data: orders, isLoading, isError } = useOrdersQuery();

  return (
    <section
      data-slot="order-history"
      className="flex flex-col border rounded-xl overflow-hidden border-gray-300 py-4 h-160.25"
    >
      {isLoading && <OrderHistorySkeleton />}
      {isError && <OrderHistoryError />}
      {!isLoading && !isError && orders && orders.length > 0 && (
        <OrderHistoryTable orders={orders} />
      )}
      {!isLoading && !isError && orders?.length === 0 && <OrderHistoryEmpty />}
    </section>
  );
}
