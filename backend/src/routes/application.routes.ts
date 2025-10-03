import express from "express"
import {
  getMyApplications,
  getJobApplications,
  createApplication,
  updateApplicationStatus,
} from "../controllers/application.controller"
import { protect, authorize } from "../middleware/auth.middleware"

const router = express.Router()

router.get("/my-applications", protect, authorize("student"), getMyApplications)
router.get("/job/:jobId", protect, authorize("client"), getJobApplications)
router.post("/", protect, authorize("student"), createApplication)
router.put("/:id/status", protect, authorize("client"), updateApplicationStatus)

export default router
