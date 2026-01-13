import "server-only";

import { cookies } from "next/headers";

import { AUTH_TOKEN_COOKIE } from "@/shared/config";

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_COOKIE)?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return Boolean(token);
}
