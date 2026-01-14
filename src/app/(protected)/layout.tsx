import { requireAuth } from "@/features/auth/server";
import { NAVIGATION_BAR_HEIGHT } from "@/shared/config";
import { GlobalNavigationBar } from "@/widgets/global-navigation-bar";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();

  return (
    <main
      className="min-h-screen bg-gray-0 pt-[var(--nav-height)]"
      style={{ ["--nav-height" as string]: `${NAVIGATION_BAR_HEIGHT}px` }}
    >
      <GlobalNavigationBar />
      <div className="mx-auto flex max-w-6xl flex-col px-6 pb-12">{children}</div>
    </main>
  );
}
