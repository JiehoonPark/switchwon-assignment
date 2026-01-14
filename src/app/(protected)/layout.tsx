import { requireAuth } from "@/features/auth/server";
import { AppHeader } from "@/widgets/app-header";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();

  return (
    <main className="min-h-screen bg-gray-0">
      <AppHeader />
      <div className="mx-auto flex max-w-6xl flex-col px-6 pb-12">{children}</div>
    </main>
  );
}
