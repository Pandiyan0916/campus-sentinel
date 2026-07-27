"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopNav } from "@/components/top-nav"
import { ChatProvider } from "@/components/chat-provider"
import { Card } from "@/components/ui/card"
import { AlertTriangle, Users, TrendingUp, Pill } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/admin/heatmap", label: "Campus Heatmap", icon: Users },
  { href: "/admin/prediction", label: "Disease Prediction", icon: AlertTriangle },
  { href: "/admin/resources", label: "Clinic Resources", icon: Pill },
  { href: "/admin/reports", label: "Student Reports", icon: Users },
]

const outbreakRiskData = [
  { day: "Mon", risk: 25 },
  { day: "Tue", risk: 30 },
  { day: "Wed", risk: 28 },
  { day: "Thu", risk: 35 },
  { day: "Fri", risk: 42 },
  { day: "Sat", risk: 38 },
  { day: "Sun", risk: 32 },
]

const topSymptoms = [
  { name: "Cough", count: 127 },
  { name: "Fever", count: 98 },
  { name: "Headache", count: 84 },
  { name: "Fatigue", count: 72 },
  { name: "Cold", count: 56 },
]

export default function AdminDashboard() {
  return (
    <>
      <div className="flex h-screen bg-background">
        <SidebarNav items={adminNavItems} title="Admin Portal" isAdmin />

        <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
          <TopNav userName="Dr. Smith" />

          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="space-y-6 max-w-7xl">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">Campus Health Intelligence</h1>
                <p className="text-muted-foreground">Real-time monitoring and predictive analytics</p>
              </div>

              {/* KPI Cards */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">Total Reports Today</p>
                  <p className="text-3xl font-bold">427</p>
                  <p className="text-xs text-green-600 mt-2">↑ 12% from yesterday</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">7-Day Outbreak Risk</p>
                  <p className="text-3xl font-bold text-secondary">42%</p>
                  <p className="text-xs text-yellow-600 mt-2">Monitor closely</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">Active Students</p>
                  <p className="text-3xl font-bold">3,847</p>
                  <p className="text-xs text-muted-foreground mt-2">Campus total</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">Clinic Capacity</p>
                  <p className="text-3xl font-bold">68%</p>
                  <p className="text-xs text-orange-600 mt-2">Moderate usage</p>
                </Card>
              </div>

              {/* Main Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Outbreak Risk Trend */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">7-Day Outbreak Risk Projection</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={outbreakRiskData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="risk"
                        stroke="var(--color-secondary)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-secondary)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                {/* Top Symptoms */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Top 5 Symptoms This Week</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={topSymptoms}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Active Alerts */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-secondary" />
                  Active Health Alerts
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "Elevated Respiratory Cases", zones: "North Campus", level: "High" },
                    { title: "Gastrointestinal Cluster", zones: "West Quad", level: "Medium" },
                    { title: "Atypical Fever Pattern", zones: "East Dorm", level: "Medium" },
                  ].map((alert, i) => (
                    <div key={i} className="p-3 border border-border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.zones}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          alert.level === "High"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        }`}
                      >
                        {alert.level}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
      <ChatProvider />
    </>
  )
}
