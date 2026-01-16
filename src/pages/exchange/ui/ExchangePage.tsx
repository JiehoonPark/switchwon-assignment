import { PageHeader } from "@/shared/ui";
import { ExchangeDashboard } from "@/widgets/exchange-dashboard";

export function ExchangePage() {
  return (
    <>
      <PageHeader
        title="환전 정보"
        description="실시간 환율을 확인하고 간편하게 환전하세요."
      />

      <ExchangeDashboard />
    </>
  );
}
