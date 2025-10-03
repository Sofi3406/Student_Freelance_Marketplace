import express from "express"
import { createReview, getUserReviews } from "../controllers/review.controller"
import { protect } from "../middleware/auth.middleware"

const router = express.Router()

router.post("/", protect, createReview)
router.get("/user/:userId", getUserReviews)

export default router
