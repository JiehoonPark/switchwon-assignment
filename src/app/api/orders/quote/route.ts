import { NextResponse } from "next/server";

import { getAuthToken } from "@/features/auth/server";
import { API_BASE_URL } from "@/shared/config";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = await getAuthToken();
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const url = new URL(request.url);
  const upstreamUrl = new URL(`${API_BASE_URL}/orders/quote`);
  upstreamUrl.search = url.searchParams.toString();

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    headers,
    cache: "no-store",
  });

  const body = await upstreamResponse.json();
  return NextResponse.json(body, { status: upstreamResponse.status });
}
