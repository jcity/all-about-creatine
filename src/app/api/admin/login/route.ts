import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken || body.token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", body.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return response;
}
