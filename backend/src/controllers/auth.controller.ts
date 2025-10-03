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
    console.log("[v0] Registration attempt:", { email: req.body.email, role: req.body.role })

    const { email, password, role, firstName, lastName, phone, ...profileData } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log("[v0] Registration failed: User already exists")
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

    console.log("[v0] User created successfully:", user._id)

    // Create profile based on role
    if (role === "student") {
      await StudentProfile.create({
        userId: user._id,
        university: profileData.university || "",
        major: profileData.major || "",
        graduationYear: profileData.graduationYear || new Date().getFullYear(),
        skills: profileData.skills || [],
      })
      console.log("[v0] Student profile created")
    } else if (role === "client") {
      await ClientProfile.create({
        userId: user._id,
        companyName: profileData.companyName || "",
        companyWebsite: profileData.companyWebsite || "",
        industry: profileData.industry || "",
      })
      console.log("[v0] Client profile created")
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
    console.error("[v0] Registration error:", error.message)
    console.error("[v0] Error stack:", error.stack)
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    console.log("[v0] Login attempt:", { email: req.body.email })

    const { email, password } = req.body

    // Check for user
    const user = await User.findOne({ email })
    if (!user) {
      console.log("[v0] Login failed: User not found")
      return res.status(401).json({ message: "Invalid credentials" })
    }

    console.log("[v0] User found, checking password")

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      console.log("[v0] Login failed: Invalid password")
      return res.status(401).json({ message: "Invalid credentials" })
    }

    console.log("[v0] Login successful for user:", user._id)

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
    console.error("[v0] Login error:", error.message)
    console.error("[v0] Error stack:", error.stack)
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
