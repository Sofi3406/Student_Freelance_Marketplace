"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface PrivateRouteProps {
  children: React.ReactNode
  role?: "student" | "client" | "admin"
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { user, loading } = useAuth()

  // ✅ While verifying auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-200">Loading...</div>
      </div>
    )
  }

  // ✅ If not logged in and no token in localStorage → redirect
  const token = localStorage.getItem("token")
  if (!user && !token) {
    return <Navigate to="/login" replace />
  }

  // ✅ If user exists but role mismatch → redirect to correct dashboard
  if (role && user && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />
  }

  // ✅ If token exists but user not yet ready → show “verifying” screen
  if (token && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-200">Verifying session...</div>
      </div>
    )
  }

  // ✅ Authenticated and authorized → show the page
  return <>{children}</>
}
