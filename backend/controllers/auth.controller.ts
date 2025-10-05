import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "default-secret", {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  })
}

// ✅ Register
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role, firstName, lastName } = req.body

    if (!email || !password || !role || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      })
    }

    const user = await User.create({
      email,
      password,
      role,
      firstName,
      lastName,
    })

    const token = generateToken(user._id.toString())

    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    res.status(201).json({
      success: true,
      token,
      user: userData,
    })
  } catch (error: any) {
    console.error("Registration error:", error)
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    })
  }
}

// ✅ Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      })
    }

    // Explicitly select password
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    const token = generateToken(user._id.toString())

    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    res.status(200).json({
      success: true,
      token,
      user: userData,
    })
  } catch (error: any) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    })
  }
}

// ✅ Get Current User
export const getMe = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - req.user is added by middleware
    const user = await User.findById(req.user?.id).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error: any) {
    console.error("Get user error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: error.message,
    })
  }
}
