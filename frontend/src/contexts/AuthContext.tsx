"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
// Import the API instance to modify its default headers
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
  // Updated login to return the User object for the caller (LoginPage.tsx)
  login: (email: string, password: string) => Promise<User> 
  register: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Helper function to set the Authorization header on the Axios instance
  const setApiAuthHeader = (token: string | null) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common["Authorization"]
    }
  }

  // 1. Initialization: Load saved user and set headers once on startup
  useEffect(() => {
    const token = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (token && savedUser) {
      try {
        const parsedUser: User = JSON.parse(savedUser)
        setUser(parsedUser)
        // CRITICAL FIX: Set the API header when the app loads
        setApiAuthHeader(token) 
      } catch (e) {
        console.error("Error parsing saved user data:", e)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setApiAuthHeader(null) 
      }
    }

    setLoading(false)
  }, [])

  // 2. LOGIN FUNCTION
  const login = async (email: string, password: string): Promise<User> => {
    const response = await api.post("/auth/login", { email, password })
    const { token, user: userData } = response.data

    if (!token || !userData) {
      throw new Error("Invalid login response: Missing token or user data.")
    }

    // Save data and set state
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    
    // CRITICAL FIX: Set the API header immediately after a successful login
    setApiAuthHeader(token) 

    // Return the user object for the caller (LoginPage.tsx) to handle navigation
    return userData
  }

  // 3. REGISTER FUNCTION
  const register = async (data: any) => {
    // Note: Registration typically doesn't log the user in immediately, 
    // so no need to set token/user here unless your backend flow is different.
    // Assuming successful registration implies redirect to login page.
    await api.post("/auth/register", data)
  }

  // 4. LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    
    // CRITICAL FIX: Clear the API header on logout
    setApiAuthHeader(null)
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
