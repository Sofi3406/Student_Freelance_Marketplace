import mongoose, { Schema, type Document } from "mongoose"

export interface IOrderDocument extends Document {
  serviceId?: mongoose.Types.ObjectId
  jobId?: mongoose.Types.ObjectId
  studentId: mongoose.Types.ObjectId
  clientId: mongoose.Types.ObjectId
  amount: number
  status: "pending" | "in_progress" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "refunded"
}

const OrderSchema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IOrderDocument>("Order", OrderSchema)
