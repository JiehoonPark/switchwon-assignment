import { NextResponse } from "next/server";

import { AUTH_TOKEN_COOKIE } from "@/shared/config";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ code: "OK", message: "Logged out." });
  response.cookies.set(AUTH_TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
  return response;
}
