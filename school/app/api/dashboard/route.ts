import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import Staff from "@/models/Staff";
import ClassRoom from "@/models/ClassRoom";
import FeePayment from "@/models/FeePayment";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [totalStudents, totalStaff, totalClasses, feeResult, recentStudents] = await Promise.all([
      Student.countDocuments({ status: "Active" }),
      Staff.countDocuments({ status: "Active" }),
      ClassRoom.countDocuments(),
      FeePayment.aggregate([
        { $match: { status: "Paid", paymentDate: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Student.find().sort({ createdAt: -1 }).limit(5).select("name className admissionNo createdAt").lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalStudents,
        totalStaff,
        totalClasses,
        feeCollectedThisMonth: feeResult[0]?.total ?? 0,
        recentStudents,
      },
    });
  } catch (error) {
    console.error("GET /api/dashboard error:", error);
    return NextResponse.json({ success: false, message: "Dashboard data unavailable. Check MongoDB configuration." }, { status: 500 });
  }
}
