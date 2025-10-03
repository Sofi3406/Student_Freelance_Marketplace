"use client"

import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Card } from "../../components/ui/Card"
import { Users, Briefcase, FileText, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalJobs: 0,
    platformRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [usersRes, servicesRes, jobsRes, ordersRes] = await Promise.all([
        api.get("/users"),
        api.get("/services"),
        api.get("/jobs"),
        api.get("/orders"),
      ])

      setStats({
        totalUsers: usersRes.data.length,
        totalServices: servicesRes.data.length,
        totalJobs: jobsRes.data.length,
        platformRevenue: ordersRes.data.reduce((sum: number, o: any) => sum + o.amount * 0.1, 0),
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
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
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Users</p>
                <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Services</p>
                <p className="text-3xl font-bold mt-2">{stats.totalServices}</p>
              </div>
              <FileText className="w-10 h-10 text-green-500" />
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold mt-2">{stats.totalJobs}</p>
              </div>
              <Briefcase className="w-10 h-10 text-purple-500" />
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Platform Revenue</p>
                <p className="text-3xl font-bold mt-2">${stats.platformRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-10 h-10 text-orange-500" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
