import mongoose, { Schema, type Document } from "mongoose"

export interface IStudentProfileDocument extends Document {
  userId: mongoose.Types.ObjectId
  university: string
  major: string
  graduationYear: number
  skills: string[]
  bio?: string
  hourlyRate?: number
  portfolio?: string
  rating: number
  totalReviews: number
}

const StudentProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    university: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    graduationYear: {
      type: Number,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
    },
    hourlyRate: {
      type: Number,
    },
    portfolio: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IStudentProfileDocument>("StudentProfile", StudentProfileSchema)
