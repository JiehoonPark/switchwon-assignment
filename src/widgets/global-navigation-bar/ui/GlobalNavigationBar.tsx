"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useLogoutMutation } from "@/features/auth";
import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Menu, Rss, X } from "lucide-react";

const NAV_ITEMS = [
  { href: ROUTES.exchange, label: "환전하기" },
  { href: ROUTES.orders, label: "환전내역" },
];
const MOBILE_MENU_ID = "global-navigation-menu";
const GNB_HEIGHT_CSS_VAR = "--gnb-height";

export function GlobalNavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { mutateAsync, isPending } = useLogoutMutation();
  const [menuOpenPathname, setMenuOpenPathname] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isMobileMenuOpen = menuOpenPathname === pathname;
  const mobileMenuLabel = isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기";
  const MobileMenuIcon = isMobileMenuOpen ? X : Menu;
  const mobileMenuWrapperClassName = cn(
    "absolute left-0 right-0 top-full z-20 grid overflow-hidden border-b border-gray-300 bg-white/95 px-4 py-3 shadow-sm backdrop-blur transition-[grid-template-rows,opacity,transform] duration-200 ease-out sm:static sm:z-auto sm:overflow-visible sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:backdrop-blur-0 sm:transition-none sm:opacity-100 sm:translate-y-0 sm:pointer-events-auto sm:grid-rows-[auto]",
    isMobileMenuOpen
      ? "grid-rows-[1fr] opacity-100 translate-y-0 pointer-events-auto"
      : "grid-rows-[0fr] opacity-0 -translate-y-2 pointer-events-none"
  );

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateGnbHeight = () => {
      const nextHeight = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty(
        GNB_HEIGHT_CSS_VAR,
        `${nextHeight}px`
      );
    };

    updateGnbHeight();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      updateGnbHeight();
    });

    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  const handleToggleMobileMenu = () => {
    setMenuOpenPathname((prev) => (prev === pathname ? null : pathname));
  };
  const handleCloseMobileMenu = () => {
    setMenuOpenPathname(null);
  };

  const handleLogout = async () => {
    await mutateAsync();
    router.replace(ROUTES.login);
  };

  return (
    <header
      data-slot="global-navigation-bar"
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-20 h-auto border-b border-gray-300 bg-white/95 backdrop-blur"
    >
      <nav className="relative mx-auto flex w-full max-w-screen-xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4 lg:px-10">
        <div className="flex w-full items-center justify-between sm:w-auto sm:justify-start">
          <div className="flex items-center gap-[10.25px]">
            <Rss
              aria-hidden="true"
              className="h-[19.5px] w-[19.5px] text-blue-500"
              strokeWidth={5}
            />
            <span className="text-[24px] font-bold leading-[133%] text-gray-700">
              Exchange app
            </span>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-50 sm:hidden"
            aria-controls={MOBILE_MENU_ID}
            aria-expanded={isMobileMenuOpen}
            aria-label={mobileMenuLabel}
            onClick={handleToggleMobileMenu}
          >
            <MobileMenuIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div id={MOBILE_MENU_ID} className={mobileMenuWrapperClassName}>
          <div className="min-h-0">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-6 lg:gap-10">
              <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleCloseMobileMenu}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-center text-[18px] sm:text-[20px]",
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
                className="w-full rounded-xl bg-blue-500 px-4 py-2 text-[18px] font-semibold leading-[133%] text-white sm:w-auto sm:text-[20px]"
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
