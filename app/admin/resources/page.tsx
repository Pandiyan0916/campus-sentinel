"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopNav } from "@/components/top-nav"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, AlertTriangle, Pill, AlertCircle } from "lucide-react"

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/admin/heatmap", label: "Campus Heatmap", icon: Users },
  { href: "/admin/prediction", label: "Disease Prediction", icon: AlertTriangle },
  { href: "/admin/resources", label: "Clinic Resources", icon: Pill },
  { href: "/admin/reports", label: "Student Reports", icon: Users },
]

const medicines = [
  { name: "Acetaminophen", stock: 450, min: 200, status: "Adequate" },
  { name: "Ibuprofen", stock: 320, min: 200, status: "Adequate" },
  { name: "Diphenhydramine", stock: 85, min: 100, status: "Low" },
  { name: "Omeprazole", stock: 210, min: 150, status: "Adequate" },
  { name: "Amoxicillin", stock: 145, min: 200, status: "Low" },
]

const beds = [
  { location: "Main Clinic", total: 12, available: 3, status: "High Occupancy" },
  { location: "East Isolation Ward", total: 8, available: 2, status: "High Occupancy" },
  { location: "West Recovery", total: 6, available: 4, status: "Moderate Occupancy" },
]

const alerts = [
  { title: "Diphenhydramine Stock Alert", severity: "warning", action: "Order immediately" },
  { title: "Amoxicillin Running Low", severity: "warning", action: "Reorder suggested" },
  { title: "East Isolation Ward Full", severity: "critical", action: "Monitor capacity" },
]

export default function ClinicResources() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNav items={adminNavItems} title="Admin Portal" isAdmin />

      <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
        <TopNav userName="Dr. Smith" />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="space-y-6 max-w-7xl">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Clinic Resources</h1>
              <p className="text-muted-foreground">Manage medicine stock and bed availability</p>
            </div>

            {/* Active Alerts */}
            {alerts.length > 0 && (
              <div className="space-y-2">
                {alerts.map((alert, i) => (
                  <Card
                    key={i}
                    className={`p-4 flex items-start gap-3 border-l-4 ${
                      alert.severity === "critical"
                        ? "border-l-destructive bg-destructive/5"
                        : "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                    }`}
                  >
                    <AlertCircle
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        alert.severity === "critical" ? "text-destructive" : "text-yellow-600"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.action}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Medicine Stock Table */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Medicine Stock Inventory</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Medicine</th>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Current Stock</th>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Min. Required</th>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((med, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-3">{med.name}</td>
                        <td className="py-3 px-3 font-semibold">{med.stock}</td>
                        <td className="py-3 px-3">{med.min}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              med.status === "Low"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            }`}
                          >
                            {med.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Bed Availability */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Bed Availability</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {beds.map((bed, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg">
                    <p className="font-medium text-sm mb-3">{bed.location}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Beds:</span>
                        <span className="font-semibold">{bed.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Available:</span>
                        <span className="font-semibold text-secondary">{bed.available}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Occupancy:</span>
                        <span className="font-semibold">
                          {Math.round(((bed.total - bed.available) / bed.total) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full"
                          style={{ width: `${((bed.total - bed.available) / bed.total) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{bed.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
