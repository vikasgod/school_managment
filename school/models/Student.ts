import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const StudentSchema = new Schema(
  {
    admissionNo: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true },
    section: { type: String, default: "A", trim: true },
    guardianName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export type StudentType = InferSchemaType<typeof StudentSchema>;
const Student: Model<StudentType> =
  (mongoose.models.Student as Model<StudentType>) ||
  mongoose.model<StudentType>("Student", StudentSchema);

export default Student;
