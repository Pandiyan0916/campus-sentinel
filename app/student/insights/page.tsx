"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopNav } from "@/components/top-nav"
import { ChatProvider } from "@/components/chat-provider"
import { Card } from "@/components/ui/card"
import { Home, Pill, Brain, BarChart3, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

const studentNavItems = [
  { href: "/student/dashboard", label: "Dashboard", icon: Home },
  { href: "/student/symptoms", label: "Report Symptoms", icon: Pill },
  { href: "/student/triage", label: "AI Triage", icon: Brain },
  { href: "/student/insights", label: "Health Insights", icon: BarChart3 },
]

const weeklyTrendData = [
  { day: "Mon", symptoms: 1 },
  { day: "Tue", symptoms: 1 },
  { day: "Wed", symptoms: 0 },
  { day: "Thu", symptoms: 2 },
  { day: "Fri", symptoms: 1 },
  { day: "Sat", symptoms: 0 },
  { day: "Sun", symptoms: 1 },
]

const symptomDistribution = [
  { name: "Headache", value: 35 },
  { name: "Fatigue", value: 25 },
  { name: "Cough", value: 20 },
  { name: "Fever", value: 20 },
]

const timeOfDayData = [
  { time: "Morning", reports: 8 },
  { time: "Afternoon", reports: 12 },
  { time: "Evening", reports: 15 },
]

const reportHistory = [
  { id: 1, date: "2024-01-15", symptoms: "Headache, Fatigue", severity: "Mild", status: "Resolved" },
  { id: 2, date: "2024-01-12", symptoms: "Cough", severity: "Moderate", status: "Resolved" },
  { id: 3, date: "2024-01-08", symptoms: "Fever", severity: "Mild", status: "Resolved" },
]

const COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-chart-3)", "var(--color-chart-4)"]

export default function HealthInsights() {
  return (
    <>
      <div className="flex h-screen bg-background">
        <SidebarNav items={studentNavItems} title="Student Portal" />

        <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
          <TopNav userName="Alex" />

          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="space-y-6 max-w-7xl">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">Health Insights</h1>
                <p className="text-muted-foreground">Comprehensive analysis of your health patterns and trends</p>
              </div>

              {/* Weekly Trends */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Weekly Symptom Trends</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="symptoms"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-primary)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Symptom Distribution & Time of Day */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Symptom Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={symptomDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="var(--color-primary)"
                        dataKey="value"
                      >
                        {symptomDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Reports by Time of Day</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={timeOfDayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="reports" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Report History Table */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Your Report History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-3 font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-3 font-medium text-muted-foreground">Symptoms</th>
                        <th className="text-left py-3 px-3 font-medium text-muted-foreground">Severity</th>
                        <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportHistory.map((report) => (
                        <tr key={report.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-3">{report.date}</td>
                          <td className="py-3 px-3">{report.symptoms}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                report.severity === "Mild"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                  : report.severity === "Moderate"
                                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                              }`}
                            >
                              {report.severity}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                              {report.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
