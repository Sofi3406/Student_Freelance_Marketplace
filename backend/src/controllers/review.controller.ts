import type { Response } from "express"
import Review from "../models/Review.model"
import StudentProfile from "../models/StudentProfile.model"
import ClientProfile from "../models/ClientProfile.model"
import Order from "../models/Order.model"
import type { AuthRequest } from "../types"

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, revieweeId, rating, comment } = req.body

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.studentId.toString() !== req.user?.id && order.clientId.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const review = await Review.create({
      orderId,
      reviewerId: req.user?.id,
      revieweeId,
      rating,
      comment,
    })

    // Update reviewee's rating
    const reviews = await Review.find({ revieweeId })
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

    const studentProfile = await StudentProfile.findOne({ userId: revieweeId })
    if (studentProfile) {
      studentProfile.rating = avgRating
      studentProfile.totalReviews = reviews.length
      await studentProfile.save()
    }

    const clientProfile = await ClientProfile.findOne({ userId: revieweeId })
    if (clientProfile) {
      clientProfile.rating = avgRating
      clientProfile.totalReviews = reviews.length
      await clientProfile.save()
    }

    res.status(201).json(review)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserReviews = async (req: AuthRequest, res: Response) => {
  try {
    const reviews = await Review.find({ revieweeId: req.params.userId })
      .populate("reviewerId", "firstName lastName avatar")
      .sort("-createdAt")
    res.json(reviews)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
