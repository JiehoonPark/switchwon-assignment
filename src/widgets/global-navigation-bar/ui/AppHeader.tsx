"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useLogoutMutation } from "@/features/auth";
import { NAVIGATION_BAR_HEIGHT, ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Rss } from "lucide-react";

const NAV_ITEMS = [
  { href: ROUTES.exchange, label: "환전하기" },
  { href: ROUTES.orders, label: "환전내역" },
];

export function GlobalNavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { mutateAsync, isPending } = useLogoutMutation();

  const handleLogout = async () => {
    await mutateAsync();
    router.replace(ROUTES.login);
  };

  return (
    <header
      data-slot="global-navigation-bar"
      className="fixed left-0 right-0 top-0 z-20 border-b border-gray-300 bg-white/95 backdrop-blur px-10 py-4 h-[var(--nav-height)]"
      style={{ ["--nav-height" as string]: `${NAVIGATION_BAR_HEIGHT}px` }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <div className="flex gap-[10.25px] items-center">
          <Rss
            aria-hidden="true"
            className="w-[19.5px] h-[19.5px] text-blue-500"
            strokeWidth={5}
          />
          <span className="text-[20px] font-bold leading-[133%] text-gray-700">
            Exchange app
          </span>
        </div>

        <div className="flex gap-10">
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
        </div>
      </nav>
    </header>
  );
}
