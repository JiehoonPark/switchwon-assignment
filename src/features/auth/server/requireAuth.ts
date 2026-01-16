import "server-only";

import { redirect } from "next/navigation";

import { ROUTES } from "@/shared/config";

import { getAuthToken } from "./getAuthToken";

export async function requireAuth(): Promise<string> {
  const token = await getAuthToken();
  if (!token) {
    redirect(ROUTES.login);
  }
  return token;
}
