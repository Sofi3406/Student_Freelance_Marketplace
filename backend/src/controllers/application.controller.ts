import type { Response } from "express"
import Application from "../models/Application.model"
import Job from "../models/Job.model"
import Order from "../models/Order.model"
import type { AuthRequest } from "../types"

export const getMyApplications = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await Application.find({ studentId: req.user?.id }).populate("jobId").sort("-createdAt")
    res.json(applications)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getJobApplications = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findOne({ _id: req.params.jobId, clientId: req.user?.id })
    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate("studentId", "firstName lastName avatar")
      .sort("-createdAt")
    res.json(applications)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const createApplication = async (req: AuthRequest, res: Response) => {
  try {
    const existingApplication = await Application.findOne({
      jobId: req.body.jobId,
      studentId: req.user?.id,
    })

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied to this job" })
    }

    const application = await Application.create({
      ...req.body,
      studentId: req.user?.id,
    })

    await Job.findByIdAndUpdate(req.body.jobId, { $inc: { applicationsCount: 1 } })

    res.status(201).json(application)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateApplicationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body
    const application = await Application.findById(req.params.id).populate("jobId")

    if (!application) {
      return res.status(404).json({ message: "Application not found" })
    }

    const job = application.jobId as any
    if (job.clientId.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    application.status = status
    await application.save()

    // If accepted, create an order
    if (status === "accepted") {
      await Order.create({
        jobId: job._id,
        studentId: application.studentId,
        clientId: req.user?.id,
        amount: application.proposedRate,
        status: "pending",
        paymentStatus: "pending",
      })

      await Job.findByIdAndUpdate(job._id, { status: "in_progress" })
    }

    res.json(application)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
