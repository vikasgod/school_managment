
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  createSessionToken,
  SESSION_COOKIE,
  type Role,
} from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password =
      typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // If your schema has an active/status field, check it here too.
    const role = user.role as Role;

    const token = await createSessionToken({
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role,
      ...(user.schoolId
        ? { schoolId: user.schoolId.toString() }
        : {}),
    });

    const response = NextResponse.json({
      message: "Login successful.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role,
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Something went wrong during login." },
      { status: 500 }
    );
  }
}
