"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useLogoutMutation } from "@/features/auth";
import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";

export function AppHeader() {
  const router = useRouter();
  const { mutateAsync, isPending } = useLogoutMutation();

  const handleLogout = async () => {
    await mutateAsync();
    router.replace(ROUTES.login);
  };

  return (
    <header data-slot="app-header">
      <nav>
        <Link href={ROUTES.exchange}>Exchange</Link>
        <Link href={ROUTES.orders}>Orders</Link>
        <Button type="button" onClick={handleLogout} disabled={isPending}>
          Log out
        </Button>
      </nav>
    </header>
  );
}
