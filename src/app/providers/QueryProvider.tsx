"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

import {
  AUTH_REDIRECT_REASONS,
  logoutAndRedirectToLogin,
} from "@/features/auth";

export function QueryProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            handleUnauthorizedError(error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            handleUnauthorizedError(error);
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function handleUnauthorizedError(error: unknown) {
  if (!isUnauthorizedError(error)) return;
  void logoutAndRedirectToLogin(AUTH_REDIRECT_REASONS.unauthorized);
}

function isUnauthorizedError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  if ("status" in error) {
    const status = (error as { status?: number }).status;
    if (status === 401) return true;
  }
  if ("response" in error) {
    const response = (error as { response?: { code?: string } }).response;
    if (response?.code === "UNAUTHORIZED") return true;
  }
  return false;
}
