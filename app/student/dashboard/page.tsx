"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopNav } from "@/components/top-nav"
import { RiskScoreCard } from "@/components/risk-score-card"
import { WeatherPanel } from "@/components/weather-panel"
import { ChatProvider } from "@/components/chat-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Pill, Brain, BarChart3 } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const studentNavItems = [
  { href: "/student/dashboard", label: "Dashboard", icon: Home },
  { href: "/student/symptoms", label: "Report Symptoms", icon: Pill },
  { href: "/student/triage", label: "AI Triage", icon: Brain },
  { href: "/student/insights", label: "Health Insights", icon: BarChart3 },
]

const trendData = [
  { day: "Mon", reports: 12 },
  { day: "Tue", reports: 19 },
  { day: "Wed", reports: 15 },
  { day: "Thu", reports: 25 },
  { day: "Fri", reports: 22 },
  { day: "Sat", reports: 18 },
  { day: "Sun", reports: 14 },
]

const symptomTodayData = [
  { name: "Fever", value: 24 },
  { name: "Cough", value: 18 },
  { name: "Headache", value: 12 },
  { name: "Fatigue", value: 10 },
]

export default function StudentDashboard() {
  return (
    <>
      <div className="flex h-screen bg-background">
        <SidebarNav items={studentNavItems} title="Student Portal" />

        <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
          <TopNav userName="Alex" hasNotifications={true} />

          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="space-y-6 max-w-7xl">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">Health Dashboard</h1>
                <p className="text-muted-foreground">Real-time campus health status and personalized insights</p>
              </div>

              {/* Risk Score & Weather */}
              <div className="grid md:grid-cols-3 gap-6">
                <RiskScoreCard score={35} />
                <div className="md:col-span-2">
                  <WeatherPanel />
                </div>
              </div>

              {/* Trending & Tips */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Trending Symptoms Today</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={symptomTodayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">AI Preventive Tips</h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Stay hydrated throughout the day",
                      "Get adequate sleep (7-9 hours)",
                      "Practice regular hand hygiene",
                      "Maintain physical distance during peak outbreak periods",
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-secondary mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Weekly Report */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Weekly Report Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="reports"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-primary)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Quick Actions */}
              <div className="flex gap-4">
                <Link href="/student/symptoms">
                  <Button>Report Symptoms</Button>
                </Link>
                <Link href="/student/triage">
                  <Button variant="outline">Get AI Analysis</Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ChatProvider />
    </>
  )
}
