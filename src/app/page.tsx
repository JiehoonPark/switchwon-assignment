import { redirect } from "next/navigation";

import { isAuthenticated } from "@/features/auth";
import { ROUTES } from "@/shared/config";

export default async function Page() {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect(ROUTES.exchange);
  }
  redirect(ROUTES.login);
}
