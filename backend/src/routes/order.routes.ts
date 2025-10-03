import express from "express"
import { getMyOrders, updateOrderStatus } from "../controllers/order.controller"
import { protect } from "../middleware/auth.middleware"

const router = express.Router()

router.get("/my-orders", protect, getMyOrders)
router.put("/:id/status", protect, updateOrderStatus)

export default router
