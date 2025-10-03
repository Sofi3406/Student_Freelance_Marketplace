"use client"

import type React from "react"

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface PrivateRouteProps {
  children: React.ReactNode
  role?: "student" | "client" | "admin"
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />
  }

  return <>{children}</>
}
