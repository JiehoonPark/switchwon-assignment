import { AppHeader } from "@/widgets/app-header";
import { OrderHistory } from "@/widgets/order-history";

export function OrdersPage() {
  return (
    <main>
      <AppHeader />
      <OrderHistory />
    </main>
  );
}
