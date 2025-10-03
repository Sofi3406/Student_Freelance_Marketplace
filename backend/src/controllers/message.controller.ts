import type { Response } from "express"
import Message from "../models/Message.model"
import type { AuthRequest } from "../types"

export const getConversations = async (req: AuthRequest, res: Response) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.user?.id }, { receiverId: req.user?.id }],
    })
      .populate("senderId", "firstName lastName avatar")
      .populate("receiverId", "firstName lastName avatar")
      .sort("-createdAt")

    // Group by conversation
    const conversations = new Map()
    messages.forEach((msg: any) => {
      const otherId =
        msg.senderId._id.toString() === req.user?.id ? msg.receiverId._id.toString() : msg.senderId._id.toString()

      if (!conversations.has(otherId)) {
        conversations.set(otherId, {
          user: msg.senderId._id.toString() === req.user?.id ? msg.receiverId : msg.senderId,
          lastMessage: msg,
          unreadCount: 0,
        })
      }

      if (!msg.read && msg.receiverId._id.toString() === req.user?.id) {
        conversations.get(otherId).unreadCount++
      }
    })

    res.json(Array.from(conversations.values()))
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user?.id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user?.id },
      ],
    })
      .populate("senderId", "firstName lastName avatar")
      .populate("receiverId", "firstName lastName avatar")
      .sort("createdAt")

    // Mark as read
    await Message.updateMany({ senderId: req.params.userId, receiverId: req.user?.id, read: false }, { read: true })

    res.json(messages)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const message = await Message.create({
      senderId: req.user?.id,
      receiverId: req.body.receiverId,
      content: req.body.content,
    })

    const populatedMessage = await Message.findById(message._id)
      .populate("senderId", "firstName lastName avatar")
      .populate("receiverId", "firstName lastName avatar")

    res.status(201).json(populatedMessage)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
