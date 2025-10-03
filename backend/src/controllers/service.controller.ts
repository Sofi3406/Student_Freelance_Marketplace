import type { Response } from "express"
import Service from "../models/Service.model"
import type { AuthRequest } from "../types"

export const getServices = async (req: AuthRequest, res: Response) => {
  try {
    const { search, category } = req.query
    const query: any = { status: "active" }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    if (category) {
      query.category = category
    }

    const services = await Service.find(query).populate("studentId", "firstName lastName avatar").sort("-createdAt")
    res.json(services)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyServices = async (req: AuthRequest, res: Response) => {
  try {
    const services = await Service.find({ studentId: req.user?.id }).sort("-createdAt")
    res.json(services)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const createService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.create({
      ...req.body,
      studentId: req.user?.id,
    })
    res.status(201).json(service)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.findOneAndUpdate({ _id: req.params.id, studentId: req.user?.id }, req.body, {
      new: true,
    })

    if (!service) {
      return res.status(404).json({ message: "Service not found" })
    }

    res.json(service)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, studentId: req.user?.id },
      { status: "deleted" },
      { new: true },
    )

    if (!service) {
      return res.status(404).json({ message: "Service not found" })
    }

    res.json({ message: "Service deleted" })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
