"use client"

import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Search, Star } from "lucide-react"

export default function ClientServices() {
  const [services, setServices] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
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

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 text-white p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Student Services</h1>
          <p className="text-zinc-400">Find talented students for your projects</p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service._id} className="bg-zinc-900 border-zinc-800 p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-zinc-400 text-sm line-clamp-3">{service.description}</p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm">{service.rating || 5.0}</span>
                </div>
                <span className="text-zinc-400 text-sm">({service.reviewCount || 0} reviews)</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div>
                  <p className="text-2xl font-bold text-blue-500">${service.price}</p>
                  <p className="text-xs text-zinc-400">{service.deliveryTime} days delivery</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Order Now</Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <Card className="bg-zinc-900 border-zinc-800 p-12 text-center">
            <p className="text-zinc-400">No services found matching your search</p>
          </Card>
        )}
      </div>
    </div>
  )
}
