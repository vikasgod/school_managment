import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ClassRoomSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    section: { type: String, default: "A", trim: true },
    classTeacher: { type: String, default: "" },
    capacity: { type: Number, default: 40, min: 1 },
  },
  { timestamps: true }
);

export type ClassRoomType = InferSchemaType<typeof ClassRoomSchema>;
const ClassRoom: Model<ClassRoomType> =
  (mongoose.models.ClassRoom as Model<ClassRoomType>) ||
  mongoose.model<ClassRoomType>("ClassRoom", ClassRoomSchema);

export default ClassRoom;
