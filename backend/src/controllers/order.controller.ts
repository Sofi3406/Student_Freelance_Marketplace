import type { Response } from "express"
import Order from "../models/Order.model"
import type { AuthRequest } from "../types"

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const query = req.user?.role === "student" ? { studentId: req.user.id } : { clientId: req.user?.id }

    const orders = await Order.find(query)
      .populate("studentId", "firstName lastName avatar")
      .populate("clientId", "firstName lastName avatar")
      .populate("serviceId")
      .populate("jobId")
      .sort("-createdAt")

    res.json(orders)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.studentId.toString() !== req.user?.id && order.clientId.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    order.status = status
    await order.save()

    res.json(order)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
