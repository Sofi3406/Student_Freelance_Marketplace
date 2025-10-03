import type { Response } from "express"
import User from "../models/User.model"
import StudentProfile from "../models/StudentProfile.model"
import ClientProfile from "../models/ClientProfile.model"
import type { AuthRequest } from "../types"

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    let profile
    if (user.role === "student") {
      profile = await StudentProfile.findOne({ userId: user._id })
    } else if (user.role === "client") {
      profile = await ClientProfile.findOne({ userId: user._id })
    }

    res.json({ user, profile })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, phone, ...profileData } = req.body

    const user = await User.findByIdAndUpdate(req.user?.id, { firstName, lastName, phone }, { new: true }).select(
      "-password",
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    let profile
    if (user.role === "student") {
      profile = await StudentProfile.findOneAndUpdate({ userId: user._id }, profileData, { new: true })
    } else if (user.role === "client") {
      profile = await ClientProfile.findOneAndUpdate({ userId: user._id }, profileData, { new: true })
    }

    res.json({ user, profile })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select("-password").sort("-createdAt")
    res.json(users)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
