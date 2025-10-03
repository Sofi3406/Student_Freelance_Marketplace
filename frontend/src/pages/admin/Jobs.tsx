"use client"

import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"

export default function AdminJobs() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs")
      setJobs(response.data)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 text-white p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Job Management</h1>

        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job._id} className="bg-zinc-900 border-zinc-800 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-zinc-400 mb-4">{job.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-zinc-400">Budget: ${job.budget}</span>
                    <span className="text-zinc-400">Status: {job.status}</span>
                    <span className="text-zinc-400">Applications: {job.applications?.length || 0}</span>
                  </div>
                </div>
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 bg-transparent">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
