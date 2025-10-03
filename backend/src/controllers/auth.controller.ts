import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.model"
import StudentProfile from "../models/StudentProfile.model"
import ClientProfile from "../models/ClientProfile.model"

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "secret", {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  })
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role, firstName, lastName, phone, ...profileData } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
    })

    // Create profile based on role
    if (role === "student") {
      await StudentProfile.create({
        userId: user._id,
        university: profileData.university || "",
        major: profileData.major || "",
        graduationYear: profileData.graduationYear || new Date().getFullYear(),
        skills: profileData.skills || [],
      })
    } else if (role === "client") {
      await ClientProfile.create({
        userId: user._id,
        companyName: profileData.companyName || "",
        companyWebsite: profileData.companyWebsite || "",
        industry: profileData.industry || "",
      })
    }

    const token = generateToken(user._id.toString(), user.role)

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Check for user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user._id.toString(), user.role)

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id).select("-password")
    res.json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
