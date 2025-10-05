"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { api } from "../lib/api"

interface User {
  id: string
  email: string
  role: "student" | "client" | "admin"
  firstName: string
  lastName: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // ✅ Load saved user once on startup
  useEffect(() => {
    const token = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }

    setLoading(false)
  }, [])

  // ✅ LOGIN FUNCTION
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data

      if (!token || !user) throw new Error("Invalid login response")

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)

      // ✅ Navigate programmatically *without reloading the page*
      if (user.role === "student") {
        window.history.pushState({}, "", "/student/dashboard")
      } else if (user.role === "client") {
        window.history.pushState({}, "", "/client/dashboard")
      } else {
        window.history.pushState({}, "", "/admin/dashboard")
      }

      // Force React Router to render new route (optional)
      window.dispatchEvent(new PopStateEvent("popstate"))
    } catch (error: any) {
      console.error("Login failed:", error?.response?.data || error.message)
      alert(error?.response?.data?.message || "Login failed, please check your email and password.")
    }
  }

  // ✅ REGISTER FUNCTION
  const register = async (data: any) => {
    try {
      const response = await api.post("/auth/register", data)
      const { token, user } = response.data

      if (!token || !user) throw new Error("Invalid register response")

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)

      // ✅ Go to login (smoothly, no reload)
      window.history.pushState({}, "", "/login")
      window.dispatchEvent(new PopStateEvent("popstate"))
    } catch (error: any) {
      console.error("Registration failed:", error?.response?.data || error.message)
      alert(error?.response?.data?.message || "Registration failed. Please try again.")
    }
  }

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)

    window.history.pushState({}, "", "/login")
    window.dispatchEvent(new PopStateEvent("popstate"))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
