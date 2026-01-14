import { requireAuth } from "@/features/auth/server";
import { GlobalNavigationBar } from "@/widgets/global-navigation-bar";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();

  return (
    <main className="min-h-screen bg-gray-0 pt-(--gnb-height)">
      <GlobalNavigationBar />
      <div className="mx-auto flex max-w-7xl flex-col gap-6">{children}</div>
    </main>
  );
}
