import type { Request } from "express"

export interface IUser {
  _id: string
  email: string
  password: string
  role: "student" | "client" | "admin"
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface IStudentProfile {
  userId: string
  university: string
  major: string
  graduationYear: number
  skills: string[]
  bio?: string
  hourlyRate?: number
  portfolio?: string
  rating: number
  totalReviews: number
}

export interface IClientProfile {
  userId: string
  companyName?: string
  companyWebsite?: string
  industry?: string
  rating: number
  totalReviews: number
}

export interface IService {
  _id: string
  studentId: string
  title: string
  description: string
  category: string
  price: number
  deliveryTime: number
  status: "active" | "paused" | "deleted"
  views: number
  orders: number
  createdAt: Date
  updatedAt: Date
}

export interface IJob {
  _id: string
  clientId: string
  title: string
  description: string
  category: string
  budget: number
  deadline: Date
  skills: string[]
  status: "open" | "in_progress" | "completed" | "closed"
  applicationsCount: number
  createdAt: Date
  updatedAt: Date
}

export interface IApplication {
  _id: string
  jobId: string
  studentId: string
  coverLetter: string
  proposedRate: number
  deliveryTime: number
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
}

export interface IOrder {
  _id: string
  serviceId?: string
  jobId?: string
  studentId: string
  clientId: string
  amount: number
  status: "pending" | "in_progress" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt: Date
  updatedAt: Date
}

export interface IReview {
  _id: string
  orderId: string
  reviewerId: string
  revieweeId: string
  rating: number
  comment: string
  createdAt: Date
}

export interface IMessage {
  _id: string
  senderId: string
  receiverId: string
  content: string
  read: boolean
  createdAt: Date
}

export interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}
