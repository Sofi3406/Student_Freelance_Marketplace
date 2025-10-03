import express from "express"
import { getJobs, getMyJobs, getJobById, createJob, updateJob, deleteJob } from "../controllers/job.controller"
import { protect, authorize } from "../middleware/auth.middleware"

const router = express.Router()

router.get("/", getJobs)
router.get("/my-jobs", protect, authorize("client"), getMyJobs)
router.get("/:id", getJobById)
router.post("/", protect, authorize("client"), createJob)
router.put("/:id", protect, authorize("client"), updateJob)
router.delete("/:id", protect, authorize("client"), deleteJob)

export default router
