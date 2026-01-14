import { requireAuth } from "@/features/auth/server";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();
  return children;
}
