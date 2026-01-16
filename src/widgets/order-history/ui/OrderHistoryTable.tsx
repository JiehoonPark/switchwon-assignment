import type { ReactNode } from "react";

import type { Order } from "@/entities/order";
import { formatCurrency, formatDateTime } from "@/shared/lib";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";

const HEADERS = ["거래 ID", "거래 일시", "매수 금액", "체결 환율", "매도 금액"];
const SKELETON_ROW_COUNT = 6;
const SKELETON_CELL_WIDTHS = ["w-10", "w-32", "w-24", "w-20", "w-24"];

type OrderHistoryTableProps = {
  orders: Order[];
  fallback?: ReactNode;
  isLoading?: boolean;
};

type SkeletonLineProps = {
  className?: string;
};

function SkeletonLine({ className }: SkeletonLineProps) {
  return (
    <span
      aria-hidden="true"
      className={`block h-4 animate-pulse rounded bg-gray-300 ${className ?? ""}`}
    />
  );
}

export function OrderHistoryTable({
  orders,
  fallback,
  isLoading = false,
}: OrderHistoryTableProps) {
  const formatRate = (value: number) =>
    new Intl.NumberFormat("ko-KR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <Table className="relative min-w-full table-fixed text-left text-sm text-gray-700">
      <TableHeader className="sticky top-0 z-10 bg-gray-0 text-gray-600">
        <TableRow>
          {HEADERS.map((header) => (
            <TableHead
              key={header}
              className="px-4 py-3 font-medium text-gray-600 whitespace-nowrap"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIndex) => (
              <TableRow
                key={`skeleton-${rowIndex}`}
                className="border-t border-gray-300"
              >
                {SKELETON_CELL_WIDTHS.map((width, cellIndex) => (
                  <TableCell
                    key={`skeleton-${rowIndex}-${cellIndex}`}
                    className="px-4 py-3"
                  >
                    <SkeletonLine className={width} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : orders.length === 0 && fallback
            ? (
                <TableRow>
                  <TableCell colSpan={HEADERS.length} className="px-4 py-10">
                    {fallback}
                  </TableCell>
                </TableRow>
              )
            : orders.map((order) => (
                <TableRow key={order.orderId} className="border-t border-gray-300">
                  <TableCell className="px-4 py-3 tabular-nums">
                    {order.orderId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 tabular-nums">
                    {formatDateTime(order.orderedAt)}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold text-gray-700 tabular-nums">
                    {formatCurrency(order.fromAmount, order.fromCurrency)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-600 tabular-nums">
                    {formatRate(order.appliedRate)}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold text-gray-700 tabular-nums">
                    {formatCurrency(order.toAmount, order.toCurrency)}
                  </TableCell>
                </TableRow>
              ))}
      </TableBody>
    </Table>
  );
}
