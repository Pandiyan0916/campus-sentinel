"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopNav } from "@/components/top-nav"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, AlertTriangle, Pill } from "lucide-react"

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/admin/heatmap", label: "Campus Heatmap", icon: Users },
  { href: "/admin/prediction", label: "Disease Prediction", icon: AlertTriangle },
  { href: "/admin/resources", label: "Clinic Resources", icon: Pill },
  { href: "/admin/reports", label: "Student Reports", icon: Users },
]

const zones = [
  { name: "North Campus", risk: 45, cases: 34, color: "bg-yellow-400" },
  { name: "South Campus", risk: 28, cases: 12, color: "bg-green-400" },
  { name: "East Dorm", risk: 62, cases: 48, color: "bg-red-500" },
  { name: "West Quad", risk: 38, cases: 24, color: "bg-orange-400" },
  { name: "Library Zone", risk: 22, cases: 8, color: "bg-green-400" },
  { name: "Athletic Center", risk: 52, cases: 36, color: "bg-orange-500" },
]

export default function CampusHeatmap() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNav items={adminNavItems} title="Admin Portal" isAdmin />

      <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
        <TopNav userName="Dr. Smith" />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="space-y-6 max-w-7xl">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Campus Health Heatmap</h1>
              <p className="text-muted-foreground">Real-time visualization of symptom density across campus zones</p>
            </div>

            {/* Map Visualization */}
            <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {zones.map((zone) => (
                  <div
                    key={zone.name}
                    className={`p-6 rounded-lg text-white cursor-pointer transition-transform hover:scale-105 ${zone.color}`}
                  >
                    <h4 className="font-semibold text-sm mb-2">{zone.name}</h4>
                    <div className="space-y-1 text-xs">
                      <p>
                        Risk: <span className="font-bold">{zone.risk}%</span>
                      </p>
                      <p>
                        Cases: <span className="font-bold">{zone.cases}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Legend & Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Legend */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Risk Level Legend</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-400 rounded" />
                    <span className="text-sm">Low Risk (0-30%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-400 rounded" />
                    <span className="text-sm">Medium Risk (31-50%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-orange-500 rounded" />
                    <span className="text-sm">High Risk (51-75%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span className="text-sm">Critical Risk (76-100%)</span>
                  </div>
                </div>
              </Card>

              {/* Zone Details */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Highest Risk Zones</h3>
                <div className="space-y-2">
                  {zones
                    .sort((a, b) => b.risk - a.risk)
                    .slice(0, 4)
                    .map((zone, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${zone.color}`} />
                          <span className="text-sm">{zone.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{zone.risk}%</span>
                      </div>
                    ))}
                </div>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="p-6 border-l-4 border-secondary">
              <h3 className="font-semibold mb-3">Recommendations</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span>Increase sanitation efforts in East Dorm (62% risk)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span>Deploy mobile clinic to Athletic Center this week</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary">•</span>
                  <span>Monitor West Quad for trend changes daily</span>
                </li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
