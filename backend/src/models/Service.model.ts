import mongoose, { Schema, type Document } from "mongoose"

export interface IServiceDocument extends Document {
  studentId: mongoose.Types.ObjectId
  title: string
  description: string
  category: string
  price: number
  deliveryTime: number
  status: "active" | "paused" | "deleted"
  views: number
  orders: number
}

const ServiceSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryTime: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["active", "paused", "deleted"],
      default: "active",
    },
    views: {
      type: Number,
      default: 0,
    },
    orders: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IServiceDocument>("Service", ServiceSchema)
