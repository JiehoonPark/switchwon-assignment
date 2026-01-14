"use client";

import type { ReactNode } from "react";

import { useOrdersQuery } from "@/features/exchange";
import { OrderHistoryEmpty } from "./OrderHistoryEmpty";
import { OrderHistoryError } from "./OrderHistoryError";
import { OrderHistorySkeleton } from "./OrderHistorySkeleton";
import { OrderHistoryTable } from "./OrderHistoryTable";

type OrderHistoryProps = {
  children?: ReactNode;
};

export function OrderHistory({ children }: OrderHistoryProps) {
  const { data: orders, isLoading, isError } = useOrdersQuery();

  return (
    <section data-slot="order-history" className="flex flex-col gap-6">
      {isLoading && <OrderHistorySkeleton />}
      {isError && <OrderHistoryError />}
      {!isLoading && !isError && orders && orders.length > 0 && (
        <OrderHistoryTable orders={orders} />
      )}
      {!isLoading && !isError && orders?.length === 0 && <OrderHistoryEmpty />}
      {children}
    </section>
  );
}
