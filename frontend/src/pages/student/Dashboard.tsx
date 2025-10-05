"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../lib/api"
import { useAuth } from "@/contexts/AuthContext"

export default function Dashboard() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    activeServices: 0,
    totalEarnings: 0,
    activeOrders: 0,
    pendingApplications: 0,
  })
  const [services, setServices] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    // 🧠 Only load data after auth is done & user exists
    if (!loading && !user) {
      navigate("/login")
    }
    if (!loading && user) {
      loadDashboardData()
    }
  }, [user, loading])

  const loadDashboardData = async () => {
    try {
      const [servicesRes, applicationsRes] = await Promise.all([
        api.get("/services/my-services"),
        api.get("/applications/my-applications"),
      ])

      setServices(servicesRes.data.slice(0, 3))
      setApplications(applicationsRes.data.slice(0, 3))

      const activeServices = servicesRes.data.filter((s: any) => s.status === "active").length
      const pendingApps = applicationsRes.data.filter((a: any) => a.status === "pending").length

      setStats({
        activeServices,
        totalEarnings: 0,
        activeOrders: 0,
        pendingApplications: pendingApps,
      })
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    }
  }

  // 🧠 While waiting for AuthContext
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading your dashboard...
      </div>
    )
  }

  // 🧠 Avoid flash before redirect
  if (!user) return null

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/student/dashboard" className="text-xl font-bold text-white">
                FreelanceHub
              </Link>
              <div className="flex gap-4">
                <Link to="/student/dashboard" className="text-sm font-medium text-blue-400">
                  Dashboard
                </Link>
                <Link to="/student/services" className="text-sm font-medium text-zinc-400 hover:text-white">
                  My Services
                </Link>
                <Link to="/student/jobs" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Browse Jobs
                </Link>
                <Link to="/student/applications" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Applications
                </Link>
                <Link to="/student/orders" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Orders
                </Link>
                <Link to="/student/messages" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Messages
                </Link>
                <Link to="/student/profile" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Profile
                </Link>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-sm font-medium text-zinc-400 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Welcome, {user.firstName} 👋
        </h1>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm font-medium text-zinc-400">Active Services</div>
            <div className="mt-2 text-3xl font-bold text-white">{stats.activeServices}</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm font-medium text-zinc-400">Total Earnings</div>
            <div className="mt-2 text-3xl font-bold text-white">${stats.totalEarnings}</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm font-medium text-zinc-400">Active Orders</div>
            <div className="mt-2 text-3xl font-bold text-white">{stats.activeOrders}</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm font-medium text-zinc-400">Pending Applications</div>
            <div className="mt-2 text-3xl font-bold text-white">{stats.pendingApplications}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex gap-4">
          <Link
            to="/student/services/new"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create New Service
          </Link>
          <Link
            to="/student/jobs"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Browse Jobs
          </Link>
        </div>

        {/* Recent Services */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Services</h2>
            <Link to="/student/services" className="text-sm font-medium text-blue-400 hover:text-blue-300">
              View All
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service._id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{service.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">${service.price}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      service.status === "active" ? "bg-green-500/10 text-green-400" : "bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Applications</h2>
            <Link to="/student/applications" className="text-sm font-medium text-blue-400 hover:text-blue-300">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application._id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{application.job?.title || "Job Title"}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      Applied {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      application.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : application.status === "accepted"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
