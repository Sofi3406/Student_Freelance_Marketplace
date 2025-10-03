import express from "express"
import { getProfile, updateProfile, getAllUsers } from "../controllers/user.controller"
import { protect, authorize } from "../middleware/auth.middleware"

const router = express.Router()

router.get("/profile", protect, getProfile)
router.put("/profile", protect, updateProfile)
router.get("/", protect, authorize("admin"), getAllUsers)

export default router
