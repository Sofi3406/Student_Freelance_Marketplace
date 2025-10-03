"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { Plus } from "lucide-react"

export default function ClientJobs() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs/my-jobs")
      setJobs(response.data)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseJob = async (jobId: string) => {
    try {
      await api.patch(`/jobs/${jobId}`, { status: "closed" })
      fetchJobs()
    } catch (error) {
      console.error("Error closing job:", error)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 text-white p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Posted Jobs</h1>
            <p className="text-zinc-400">Manage your job postings and applications</p>
          </div>
          <Link to="/client/jobs/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800 p-12 text-center">
              <p className="text-zinc-400 mb-4">You haven't posted any jobs yet</p>
              <Link to="/client/jobs/new">
                <Button className="bg-blue-600 hover:bg-blue-700">Post Your First Job</Button>
              </Link>
            </Card>
          ) : (
            jobs.map((job) => (
              <Card key={job._id} className="bg-zinc-900 border-zinc-800 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === "open" ? "bg-green-500/20 text-green-400" : "bg-zinc-700 text-zinc-400"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <p className="text-zinc-400 mb-4">{job.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-zinc-400">
                        Budget: <span className="text-white font-medium">${job.budget}</span>
                      </span>
                      <span className="text-zinc-400">
                        Applications: <span className="text-white font-medium">{job.applications?.length || 0}</span>
                      </span>
                      <span className="text-zinc-400">
                        Category: <span className="text-white">{job.category}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/client/jobs/${job._id}`}>
                      <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 bg-transparent">
                        View Applications
                      </Button>
                    </Link>
                    {job.status === "open" && (
                      <Button
                        variant="outline"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                        onClick={() => handleCloseJob(job._id)}
                      >
                        Close Job
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
