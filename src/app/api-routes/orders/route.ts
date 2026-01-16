import { NextResponse } from "next/server";

import { getAuthToken } from "@/features/auth/server";
import { API_BASE_URL } from "@/shared/config";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = await getAuthToken();
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const upstreamResponse = await fetch(`${API_BASE_URL}/orders`, {
    headers,
    cache: "no-store",
  });

  const body = await upstreamResponse.json();
  return NextResponse.json(body, { status: upstreamResponse.status });
}

export async function POST(request: Request) {
  const token = await getAuthToken();
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const payload = await request.json();
  const upstreamResponse = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const body = await upstreamResponse.json();
  return NextResponse.json(body, { status: upstreamResponse.status });
}
