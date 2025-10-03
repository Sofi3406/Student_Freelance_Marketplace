import mongoose, { Schema, type Document } from "mongoose"

export interface IReviewDocument extends Document {
  orderId: mongoose.Types.ObjectId
  reviewerId: mongoose.Types.ObjectId
  revieweeId: mongoose.Types.ObjectId
  rating: number
  comment: string
}

const ReviewSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    revieweeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IReviewDocument>("Review", ReviewSchema)
