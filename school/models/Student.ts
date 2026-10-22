import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const StudentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    admissionNo: { type: String, required: true, unique: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female"], default: "Male" },
    className: { type: String, required: true, trim: true },
    section: { type: String, default: "A", trim: true },
    guardianName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    email: { type: String, required: true, trim: true, unique: true },
    address: { type: String, required: true, trim: true },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export type StudentType = InferSchemaType<typeof StudentSchema>;
const Student: Model<StudentType> =
  (mongoose.models.Student as Model<StudentType>) ||
  mongoose.model<StudentType>("Student", StudentSchema);

export default Student;
