import mongoose, { Schema, type Document } from "mongoose"

export interface IJobDocument extends Document {
  clientId: mongoose.Types.ObjectId
  title: string
  description: string
  category: string
  budget: number
  deadline: Date
  skills: string[]
  status: "open" | "in_progress" | "completed" | "closed"
  applicationsCount: number
}

const JobSchema = new Schema(
  {
    clientId: {
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
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    deadline: {
      type: Date,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "completed", "closed"],
      default: "open",
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IJobDocument>("Job", JobSchema)
