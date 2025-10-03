import express from "express"
import {
  getServices,
  getMyServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller"
import { protect, authorize } from "../middleware/auth.middleware"

const router = express.Router()

router.get("/", getServices)
router.get("/my-services", protect, authorize("student"), getMyServices)
router.post("/", protect, authorize("student"), createService)
router.put("/:id", protect, authorize("student"), updateService)
router.delete("/:id", protect, authorize("student"), deleteService)

export default router
