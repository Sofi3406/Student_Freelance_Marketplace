"use client"

import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await api.get("/services")
      setServices(response.data)
    } catch (error) {
      console.error("Error fetching services:", error)
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
        <h1 className="text-3xl font-bold mb-8">Service Management</h1>

        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service._id} className="bg-zinc-900 border-zinc-800 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-zinc-400 mb-4">{service.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-zinc-400">Price: ${service.price}</span>
                    <span className="text-zinc-400">Category: {service.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 bg-transparent">
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    Suspend
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
