import express from "express"
import { getConversations, getMessages, sendMessage } from "../controllers/message.controller"
import { protect } from "../middleware/auth.middleware"

const router = express.Router()

router.get("/conversations", protect, getConversations)
router.get("/:userId", protect, getMessages)
router.post("/", protect, sendMessage)

export default router
