import { NextResponse } from "next/server";

import { getAuthToken } from "@/features/auth/server";
import { API_BASE_URL } from "@/shared/config";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = await getAuthToken();
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const upstreamResponse = await fetch(`${API_BASE_URL}/exchange-rates/latest`, {
    headers,
    cache: "no-store",
  });

  const body = await upstreamResponse.json();
  return NextResponse.json(body, { status: upstreamResponse.status });
}
