"use client";

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: "student" | "client" | "admin";
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  // Use the loading and user states provided by the context.
  const { user, loading } = useAuth();

  // 1. Loading Check: This is the single source of truth for initialization.
  // We wait until the AuthProvider has finished checking localStorage.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-primary font-semibold p-4 rounded-lg shadow-md animate-pulse">
          Loading Application...
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Check: If loading is complete and there is no user, redirect to login.
  // This handles the case where the user has logged out or the token expired.
  if (!user) {
    // Navigate hook ensures a clean, declarative redirect.
    return <Navigate to="/login" replace />;
  }

  // 3. Authorization Check (Role Mismatch):
  // If the user is authenticated but accessing a route meant for a different role,
  // redirect them to their own dashboard.
  if (role && user.role !== role) {
    console.warn(`Access denied. Redirecting ${user.role} to their dashboard.`);
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // 4. Authorized: Render the children (the requested page).
  return <>{children}</>;
}