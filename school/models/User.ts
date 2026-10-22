import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";
import { ROLES } from "@/lib/auth";

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ROLES, required: true, default: "STUDENT" },
  schoolId: { type: Schema.Types.ObjectId, ref: "School", default: null, index: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export type UserDocument = InferSchemaType<typeof UserSchema>;
const User = (mongoose.models.User as Model<UserDocument>) || mongoose.model<UserDocument>("User", UserSchema);
export default User;
