import type { WalletSummary } from "@/entities/wallet";
import type { Currency } from "@/shared/lib";
import { cn, formatCurrency } from "@/shared/lib";
import { Card } from "@/shared/ui";

import { WALLET_DISPLAY_ORDER } from "../model/constants";

type WalletSummaryCardProps = {
  walletSummary?: WalletSummary;
  isLoading: boolean;
  className?: string;
};

type SkeletonLineProps = {
  className?: string;
};

function SkeletonLine({ className }: SkeletonLineProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("block animate-pulse rounded bg-gray-300", className)}
    />
  );
}

export function WalletSummaryCard({
  walletSummary,
  isLoading,
  className,
}: WalletSummaryCardProps) {
  const totalBalanceContent = (() => {
    if (isLoading) {
      return <SkeletonLine className="h-5 w-24" />;
    }
    if (!walletSummary) return "-";
    return formatCurrency(walletSummary.totalKrwBalance, "KRW");
  })();

  return (
    <Card
      className={cn(
        "flex flex-col rounded-xl border border-gray-300 bg-gray-0 px-6 py-6 md:px-8",
        className
      )}
    >
      <h2 className="mb-8 text-[24px] font-extrabold text-gray-800">내 지갑</h2>

      <div className="flex flex-col gap-3">
        {WALLET_DISPLAY_ORDER.map((currency) => {
          const balance = walletSummary?.wallets.find(
            (wallet) => wallet.currency === currency
          )?.balance;
          const balanceContent =
            isLoading || typeof balance === "undefined" ? (
              <SkeletonLine className="h-5 w-24" />
            ) : (
              formatCurrency(balance, currency as Currency)
            );
          return (
            <div
              key={currency}
              className="flex items-center justify-between text-[20px] text-gray-600"
            >
              <span className="font-medium">{currency}</span>
              <span className="font-semibold tabular-nums">
                {balanceContent}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-gray-300 pb-2 pt-5 text-[20px] lg:mt-auto mt-10">
        <span className="font-semibold text-gray-600">총 보유 자산</span>
        <span className="font-bold text-blue-500 tabular-nums">
          {totalBalanceContent}
        </span>
      </div>
    </Card>
  );
}
