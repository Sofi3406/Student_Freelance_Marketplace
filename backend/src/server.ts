import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import serviceRoutes from "./routes/service.routes"
import jobRoutes from "./routes/job.routes"
import applicationRoutes from "./routes/application.routes"
import orderRoutes from "./routes/order.routes"
import reviewRoutes from "./routes/review.routes"
import messageRoutes from "./routes/message.routes"
import { errorHandler } from "./middleware/error.middleware"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/messages", messageRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

// Error handler
app.use(errorHandler)

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
