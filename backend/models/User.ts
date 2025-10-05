import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  email: string
  password: string
  role: "student" | "client" | "admin"
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  bio?: string
  skills?: string[]
  rating?: number
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: true, // ensure password can be fetched
    },
    role: {
      type: String,
      enum: ["student", "client", "admin"],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
)

// ✅ Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.get("password"), salt)
  next()
})

// ✅ Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IUser>("User", userSchema)
