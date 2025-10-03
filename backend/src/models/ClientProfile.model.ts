import mongoose, { Schema, type Document } from "mongoose"

export interface IClientProfileDocument extends Document {
  userId: mongoose.Types.ObjectId
  companyName?: string
  companyWebsite?: string
  industry?: string
  rating: number
  totalReviews: number
}

const ClientProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
    industry: {
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

export default mongoose.model<IClientProfileDocument>("ClientProfile", ClientProfileSchema)
