"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../lib/api"

export default function StudentJobs() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      const response = await api.get("/jobs")
      setJobs(response.data.filter((job: any) => job.status === "open"))
    } catch (error) {
      console.error("Failed to load jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                <Link to="/student/jobs" className="text-sm font-medium text-blue-400">
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
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Browse Jobs</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {loading ? (
          <div className="text-center text-zinc-400">Loading...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-12 text-center">
            <p className="text-zinc-400">No jobs found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job._id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">Posted by {job.client?.name || "Client"}</p>
                  </div>
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    Open
                  </span>
                </div>
                <p className="mb-4 text-zinc-300">{job.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {job.requiredSkills?.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm text-zinc-400">
                    <span>Budget: ${job.budget}</span>
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    <span>{job.applications?.length || 0} applications</span>
                  </div>
                  <Link
                    to={`/student/jobs/${job._id}`}
                    className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
