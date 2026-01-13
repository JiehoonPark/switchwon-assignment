"use client";

import type { ReactNode } from "react";

import { useOrdersQuery } from "@/features/exchange";

type OrderHistoryProps = {
  children?: ReactNode;
};

export function OrderHistory({ children }: OrderHistoryProps) {
  const { data: orders } = useOrdersQuery();

  return (
    <section data-slot="order-history" data-has-orders={Boolean(orders)}>
      {children}
    </section>
  );
}
