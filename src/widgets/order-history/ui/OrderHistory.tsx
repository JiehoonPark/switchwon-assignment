"use client";

import { useOrdersQuery } from "@/features/exchange";
import { OrderHistoryEmpty } from "./OrderHistoryEmpty";
import { OrderHistoryError } from "./OrderHistoryError";
import { OrderHistoryTable } from "./OrderHistoryTable";

export function OrderHistory() {
  const { data: orders, isLoading, isError } = useOrdersQuery();
  const hasOrders = Boolean(orders && orders.length > 0);
  const fallback = (() => {
    if (isError) {
      return <OrderHistoryError />;
    }
    return <OrderHistoryEmpty />;
  })();

  return (
    <section
      data-slot="order-history"
      className="flex h-160.25 flex-col overflow-hidden rounded-xl border border-gray-300 bg-white"
    >
      <div className="h-full overflow-y-auto">
        <OrderHistoryTable
          orders={orders ?? []}
          fallback={!isLoading && !hasOrders ? fallback : undefined}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
