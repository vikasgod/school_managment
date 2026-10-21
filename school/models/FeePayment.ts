import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const FeePaymentSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    amount: { type: Number, required: true, min: 0 },
    paymentDate: { type: Date, default: Date.now },
    month: { type: String, required: true },
    status: { type: String, enum: ["Paid", "Pending", "Overdue"], default: "Paid" },
    receiptNo: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export type FeePaymentType = InferSchemaType<typeof FeePaymentSchema>;
const FeePayment: Model<FeePaymentType> =
  (mongoose.models.FeePayment as Model<FeePaymentType>) ||
  mongoose.model<FeePaymentType>("FeePayment", FeePaymentSchema);

export default FeePayment;
