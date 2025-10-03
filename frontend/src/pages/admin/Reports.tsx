import { Card } from "../../components/ui/Card"

export default function AdminReports() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Reports & Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4">User Growth</h2>
            <p className="text-zinc-400">User registration trends over time</p>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Revenue Analytics</h2>
            <p className="text-zinc-400">Platform revenue and transaction data</p>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Service Performance</h2>
            <p className="text-zinc-400">Top performing services and categories</p>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Job Statistics</h2>
            <p className="text-zinc-400">Job posting and completion rates</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
