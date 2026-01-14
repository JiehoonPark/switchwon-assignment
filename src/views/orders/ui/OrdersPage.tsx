import { PageHeader } from "@/shared/ui";
import { OrderHistory } from "@/widgets/order-history";

export function OrdersPage() {
  return (
    <>
      <PageHeader
        title="환전 내역"
        description="환전 내역을 확인하실 수 있어요."
      />

      <OrderHistory />
    </>
  );
}
