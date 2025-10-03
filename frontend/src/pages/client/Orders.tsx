"use client"

import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"

export default function ClientOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders")
      setOrders(response.data.filter((o: any) => o.clientId))
    } catch (error) {
      console.error("Error fetching orders:", error)
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-zinc-400">Track your service orders</p>
        </div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800 p-12 text-center">
              <p className="text-zinc-400">No orders yet</p>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order._id} className="bg-zinc-900 border-zinc-800 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{order.serviceTitle}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          order.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : order.status === "in_progress"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-zinc-700 text-zinc-400"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-zinc-400">Amount: ${order.amount}</span>
                    </div>
                  </div>
                  {order.status === "completed" && (
                    <Button className="bg-blue-600 hover:bg-blue-700">Leave Review</Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
