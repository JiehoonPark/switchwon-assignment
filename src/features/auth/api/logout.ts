import { apiClient } from "@/shared/api";

export async function logout() {
  await apiClient.post<null, Record<string, never>>("/auth/logout", {});
}
