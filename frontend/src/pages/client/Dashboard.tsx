"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../lib/api"

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalSpent: 0,
    activeOrders: 0,
    totalApplications: 0,
  })
  const [jobs, setJobs] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [jobsRes, servicesRes] = await Promise.all([api.get("/jobs/my-jobs"), api.get("/services")])

      setJobs(jobsRes.data.slice(0, 3))
      setServices(servicesRes.data.slice(0, 3))

      const activeJobs = jobsRes.data.filter((j: any) => j.status === "open").length
      const totalApps = jobsRes.data.reduce((sum: number, j: any) => sum + (j.applications?.length || 0), 0)

      setStats({
        activeJobs,
        totalSpent: 0,
        activeOrders: 0,
        totalApplications: totalApps,
      })
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/client/dashboard" className="text-xl font-bold text-white">
                FreelanceHub
              </Link>
              <div className="flex gap-4">
                <Link to="/client/dashboard" className="text-sm font-medium text-blue-400">
                  Dashboard
                </Link>
                <Link to="/client/jobs" className="text-sm font-medium text-zinc-400 hover:text-white">
                  My Jobs
                </Link>
                <Link to="/client/services" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Browse Services
                </Link>
                <Link to="/client/orders" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Orders
                </Link>
                <Link to="/client/messages" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Messages
                </Link>
                <Link to="/client/profile" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Profile
                </Link>
              </div>
            </div>
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Client Dashboard</h1>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm font-medium text-zinc-400">Active Jobs</div>
            <div className="mt-2 text-3xl font-bold text-white">{stats.activeJobs}</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm font-medium text-zinc-400">Total Spent</div>
            <div className="mt-2 text-3xl font-bold text-white">${stats.totalSpent}</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm font-medium text-zinc-400">Active Orders</div>
            <div className="mt-2 text-3xl font-bold text-white">{stats.activeOrders}</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="text-sm font-medium text-zinc-400">Total Applications</div>
            <div className="mt-2 text-3xl font-bold text-white">{stats.totalApplications}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex gap-4">
          <Link
            to="/client/jobs/new"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Post New Job
          </Link>
          <Link
            to="/client/services"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Browse Services
          </Link>
        </div>

        {/* Recent Jobs */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Jobs</h2>
            <Link to="/client/jobs" className="text-sm font-medium text-blue-400 hover:text-blue-300">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{job.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{job.applications?.length || 0} applications</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      job.status === "open" ? "bg-green-500/10 text-green-400" : "bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Services */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Featured Services</h2>
            <Link to="/client/services" className="text-sm font-medium text-blue-400 hover:text-blue-300">
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
                  <span className="text-sm text-zinc-400">{service.deliveryTime} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
