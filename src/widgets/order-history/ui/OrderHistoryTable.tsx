import type { Order } from "@/entities/order";
import { formatCurrency, formatDateTime } from "@/shared/lib";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui";

const HEADERS = [
  "거래 ID",
  "거래 일시",
  "매수 금액",
  "적용 환율",
  "매도 금액",
];

type OrderHistoryTableProps = {
  orders: Order[];
};

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  const formatRate = (value: number) =>
    new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
      value,
    );

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300">
      <Table className="min-w-full text-left text-sm text-gray-700">
        <TableHeader className="bg-gray-0 text-gray-600">
          <TableRow>
            {HEADERS.map((header) => (
              <TableHead key={header} className="px-4 py-3 font-medium">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderId} className="border-t border-gray-300">
              <TableCell className="px-4 py-3">{order.orderId}</TableCell>
              <TableCell className="px-4 py-3 text-gray-600">
                {formatDateTime(order.orderedAt)}
              </TableCell>
              <TableCell className="px-4 py-3 font-semibold text-gray-700">
                {formatCurrency(order.fromAmount, order.fromCurrency)}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-600">
                {formatRate(order.appliedRate)}
              </TableCell>
              <TableCell className="px-4 py-3 font-semibold text-gray-700">
                {formatCurrency(order.toAmount, order.toCurrency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
