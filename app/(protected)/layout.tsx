import { requireAuth } from "@/features/auth/server";
import { GlobalNavigationBar } from "@/widgets/global-navigation-bar";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();

  return (
    <main className="min-h-screen bg-gray-0 pt-[213.86px] sm:pt-[var(--gnb-height)]">
      <GlobalNavigationBar />
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 pb-12.5 sm:px-6">
        {children}
      </div>
    </main>
  );
}
