import { ROUTES } from "@/shared/config";

import {
  AUTH_REDIRECT_QUERY_KEY,
  type AuthRedirectReason,
} from "../config/redirect";

let isRedirecting = false;

export async function logoutAndRedirectToLogin(reason?: AuthRedirectReason) {
  if (typeof window === "undefined") return;
  if (isRedirecting) return;

  isRedirecting = true;

  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // ignore logout failures; redirect still happens
  }

  const url = new URL(ROUTES.login, window.location.origin);
  if (reason) {
    url.searchParams.set(AUTH_REDIRECT_QUERY_KEY, reason);
  }
  window.location.replace(url.toString());
}
