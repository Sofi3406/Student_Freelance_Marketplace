"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../lib/api"

export default function StudentApplications() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      const response = await api.get("/applications/my-applications")
      setApplications(response.data)
    } catch (error) {
      console.error("Failed to load applications:", error)
    } finally {
      setLoading(false)
    }
  }

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
                <Link to="/student/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Dashboard
                </Link>
                <Link to="/student/services" className="text-sm font-medium text-zinc-400 hover:text-white">
                  My Services
                </Link>
                <Link to="/student/jobs" className="text-sm font-medium text-zinc-400 hover:text-white">
                  Browse Jobs
                </Link>
                <Link to="/student/applications" className="text-sm font-medium text-blue-400">
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
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-white">My Applications</h1>

        {loading ? (
          <div className="text-center text-zinc-400">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-12 text-center">
            <p className="text-zinc-400">You haven't applied to any jobs yet.</p>
            <Link to="/student/jobs" className="mt-4 inline-block text-blue-400 hover:text-blue-300">
              Browse available jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div key={application._id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{application.job?.title || "Job Title"}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      Applied on {new Date(application.createdAt).toLocaleDateString()}
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
                <div className="mb-4">
                  <p className="text-sm font-medium text-zinc-400">Cover Letter:</p>
                  <p className="mt-1 text-zinc-300">{application.coverLetter}</p>
                </div>
                <div className="flex gap-6 text-sm text-zinc-400">
                  <span>Proposed Rate: ${application.proposedRate}</span>
                  <span>Delivery Time: {application.deliveryTime} days</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
