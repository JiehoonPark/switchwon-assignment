import { NextResponse } from "next/server";

import { API_BASE_URL, AUTH_TOKEN_COOKIE } from "@/shared/config";

export const dynamic = "force-dynamic";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24;

type LoginPayload = {
  email?: string;
};

type LoginResponse = {
  code?: string;
  message?: string;
  data?: {
    memberId?: number;
    token?: string;
  };
};

function normalizeEmail(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

export async function POST(request: Request) {
  let payload: LoginPayload = {};

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      payload = (await request.json()) as LoginPayload;
    } else {
      const formData = await request.formData();
      payload = {
        email: normalizeEmail(formData.get("email")),
      };
    }
  } catch {
    payload = {};
  }

  const email = normalizeEmail(payload.email);

  const upstreamResponse = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ email }),
    cache: "no-store",
  });

  let upstreamJson: LoginResponse | null = null;
  try {
    upstreamJson = (await upstreamResponse.json()) as LoginResponse;
  } catch {
    upstreamJson = null;
  }

  if (!upstreamJson) {
    return NextResponse.json(null, { status: upstreamResponse.status });
  }

  const response = NextResponse.json(upstreamJson, {
    status: upstreamResponse.status,
  });

  const token = upstreamJson.data?.token;
  if (token) {
    response.cookies.set(AUTH_TOKEN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: COOKIE_MAX_AGE_SECONDS,
      path: "/",
    });
  }

  return response;
}
