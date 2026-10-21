import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET() {
  try {
    await connectDB();
    const students = await Student.find().sort({ createdAt: -1 }).limit(100).lean();
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    console.error("GET /api/students error:", error);
    return NextResponse.json({ success: false, message: "Could not fetch students. Check MongoDB configuration." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const admissionNo = String(body.admissionNo ?? "").trim();
    const name = String(body.name ?? "").trim();
    const className = String(body.className ?? "").trim();
    const guardianName = String(body.guardianName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const section = String(body.section ?? "A").trim();

    if (!admissionNo || !name || !className || !guardianName || !phone) {
      return NextResponse.json({ success: false, message: "admissionNo, name, className, guardianName and phone are required." }, { status: 400 });
    }

    await connectDB();
    const student = await Student.create({ admissionNo, name, className, section, guardianName, phone });
    return NextResponse.json({ success: true, data: student }, { status: 201 });
  } catch (error: unknown) {
    const duplicate = typeof error === "object" && error !== null && "code" in error && error.code === 11000;
    if (duplicate) {
      return NextResponse.json({ success: false, message: "Admission number already exists." }, { status: 409 });
    }
    console.error("POST /api/students error:", error);
    return NextResponse.json({ success: false, message: "Could not save student. Check the submitted data and MongoDB configuration." }, { status: 500 });
  }
}
