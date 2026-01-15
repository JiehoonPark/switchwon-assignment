"use client";

import { useOrdersQuery } from "@/features/exchange";
import { Spinner } from "@/shared/ui";
import { OrderHistoryEmpty } from "./OrderHistoryEmpty";
import { OrderHistoryError } from "./OrderHistoryError";
import { OrderHistoryTable } from "./OrderHistoryTable";

export function OrderHistory() {
  const { data: orders, isLoading, isError } = useOrdersQuery();
  const hasOrders = Boolean(orders && orders.length > 0);
  const fallback = isLoading ? (
    <div className="flex w-full items-center justify-center">
      <Spinner />
    </div>
  ) : isError ? (
    <OrderHistoryError />
  ) : (
    <OrderHistoryEmpty />
  );

  return (
    <section
      data-slot="order-history"
      className="flex h-160.25 flex-col overflow-hidden rounded-xl border border-gray-300 bg-white"
    >
      <div className="h-full overflow-y-auto">
        <OrderHistoryTable
          orders={orders ?? []}
          fallback={hasOrders ? undefined : fallback}
        />
      </div>
    </section>
  );
}
