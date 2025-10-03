import type { Response } from "express"
import Job from "../models/Job.model"
import type { AuthRequest } from "../types"

export const getJobs = async (req: AuthRequest, res: Response) => {
  try {
    const { search, category } = req.query
    const query: any = { status: "open" }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    if (category) {
      query.category = category
    }

    const jobs = await Job.find(query).populate("clientId", "firstName lastName avatar").sort("-createdAt")
    res.json(jobs)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyJobs = async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await Job.find({ clientId: req.user?.id }).sort("-createdAt")
    res.json(jobs)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate("clientId", "firstName lastName avatar")
    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }
    res.json(job)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.create({
      ...req.body,
      clientId: req.user?.id,
    })
    res.status(201).json(job)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findOneAndUpdate({ _id: req.params.id, clientId: req.user?.id }, req.body, { new: true })

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    res.json(job)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, clientId: req.user?.id },
      { status: "closed" },
      { new: true },
    )

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    res.json({ message: "Job closed" })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
