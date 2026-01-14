"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useLogoutMutation } from "@/features/auth";
import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";

const NAV_ITEMS = [
  { href: ROUTES.exchange, label: "환전하기" },
  { href: ROUTES.orders, label: "환전내역" },
];

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { mutateAsync, isPending } = useLogoutMutation();

  const handleLogout = async () => {
    await mutateAsync();
    router.replace(ROUTES.login);
  };

  return (
    <header
      data-slot="app-header"
      className="border-b border-gray-300 bg-white px-10 py-4 h-18.75"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <div>
          <span className="font-bold text-[24px] leading-[133%]">
            Exchange app
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "w-29.5 text-center text-[20px]",
                  active ? "font-bold text-cta" : "font-medium text-[#8899AA]"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          className="rounded-xl bg-blue-500 px-4 py-2 text-[20px] font-semibold leading-[133%] text-white"
        >
          Log out
        </Button>
      </nav>
    </header>
  );
}
