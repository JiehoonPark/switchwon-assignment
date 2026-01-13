import { apiClient } from "@/shared/api";

import type { LoginRequest, TokenResponse } from "../model/types";

export async function login(request: LoginRequest) {
  const response = await apiClient.post<TokenResponse, LoginRequest>(
    "/auth/login",
    request,
  );
  return response.data;
}
