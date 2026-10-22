
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated." },
      { status: 401 }
    );
  }

  const user = await verifySessionToken(token);

  if (!user) {
    const response = NextResponse.json(
      { message: "Session expired. Please login again." },
      { status: 401 }
    );

    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  return NextResponse.json({ user });
}
