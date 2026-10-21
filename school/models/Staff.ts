import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const StaffSchema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export type StaffType = InferSchemaType<typeof StaffSchema>;
const Staff: Model<StaffType> =
  (mongoose.models.Staff as Model<StaffType>) ||
  mongoose.model<StaffType>("Staff", StaffSchema);

export default Staff;
