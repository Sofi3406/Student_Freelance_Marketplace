"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../lib/api"

export default function StudentServices() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const response = await api.get("/services/my-services")
      setServices(response.data)
    } catch (error) {
      console.error("Failed to load services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      await api.delete(`/services/${id}`)
      setServices(services.filter((s) => s._id !== id))
    } catch (error) {
      console.error("Failed to delete service:", error)
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
                <Link to="/student/services" className="text-sm font-medium text-blue-400">
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
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">My Services</h1>
          <Link
            to="/student/services/new"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create New Service
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-zinc-400">Loading...</div>
        ) : services.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-12 text-center">
            <p className="text-zinc-400">You haven't created any services yet.</p>
            <Link to="/student/services/new" className="mt-4 inline-block text-blue-400 hover:text-blue-300">
              Create your first service
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service._id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="font-semibold text-white">{service.title}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      service.status === "active" ? "bg-green-500/10 text-green-400" : "bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <p className="mb-4 text-sm text-zinc-400 line-clamp-3">{service.description}</p>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">${service.price}</span>
                  <span className="text-sm text-zinc-400">{service.deliveryTime} days</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/student/services/${service._id}/edit`}
                    className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="flex-1 rounded-lg border border-red-900 bg-red-950 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
