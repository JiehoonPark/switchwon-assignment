"use client";

import type { ReactNode } from "react";

import { useOrdersQuery } from "@/features/exchange";
import { Spinner } from "@/shared/ui";
import { OrderHistoryEmpty } from "./OrderHistoryEmpty";
import { OrderHistoryError } from "./OrderHistoryError";
import { OrderHistoryTable } from "./OrderHistoryTable";

export function OrderHistory() {
  const { data: orders, isLoading, isError } = useOrdersQuery();

  return (
    <section
      data-slot="order-history"
      className="flex h-160.25 flex-col overflow-hidden rounded-xl border border-gray-300 bg-white"
    >
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      )}
      {isError && <OrderHistoryError />}
      {!isLoading && !isError && orders && orders.length > 0 && (
        <div className="h-full overflow-y-auto">
          <OrderHistoryTable orders={orders} />
        </div>
      )}
      {!isLoading && !isError && orders?.length === 0 && <OrderHistoryEmpty />}
    </section>
  );
}
