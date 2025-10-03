import mongoose, { Schema, type Document } from "mongoose"

export interface IApplicationDocument extends Document {
  jobId: mongoose.Types.ObjectId
  studentId: mongoose.Types.ObjectId
  coverLetter: string
  proposedRate: number
  deliveryTime: number
  status: "pending" | "accepted" | "rejected"
}

const ApplicationSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    proposedRate: {
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
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IApplicationDocument>("Application", ApplicationSchema)
