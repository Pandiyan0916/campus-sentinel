"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopNav } from "@/components/top-nav"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, AlertTriangle, Pill } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  BarChart,
  Bar,
} from "recharts"

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/admin/heatmap", label: "Campus Heatmap", icon: Users },
  { href: "/admin/prediction", label: "Disease Prediction", icon: AlertTriangle },
  { href: "/admin/resources", label: "Clinic Resources", icon: Pill },
  { href: "/admin/reports", label: "Student Reports", icon: Users },
]

const outbreakPredictionData = [
  { week: "Week 1", predicted: 45, confidence: 92 },
  { week: "Week 2", predicted: 68, confidence: 88 },
  { week: "Week 3", predicted: 92, confidence: 82 },
  { week: "Week 4", predicted: 115, confidence: 75 },
  { week: "Week 5", predicted: 128, confidence: 68 },
]

const weatherCorrelationData = [
  { day: "Mon", cases: 24, temp: 65, humidity: 60 },
  { day: "Tue", cases: 32, temp: 62, humidity: 75 },
  { day: "Wed", cases: 28, temp: 68, humidity: 55 },
  { day: "Thu", cases: 45, temp: 58, humidity: 85 },
  { day: "Fri", cases: 52, temp: 55, humidity: 90 },
]

const seasonalityData = [
  { month: "Jan", cases: 245 },
  { month: "Feb", cases: 312 },
  { month: "Mar", cases: 198 },
  { month: "Apr", cases: 156 },
  { month: "May", cases: 124 },
  { month: "Jun", cases: 98 },
  { month: "Jul", cases: 87 },
  { month: "Aug", cases: 95 },
  { month: "Sep", cases: 156 },
  { month: "Oct", cases: 234 },
  { month: "Nov", cases: 289 },
  { month: "Dec", cases: 334 },
]

export default function DiseasePrediction() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNav items={adminNavItems} title="Admin Portal" isAdmin />

      <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
        <TopNav userName="Dr. Smith" />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="space-y-6 max-w-7xl">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Disease Prediction Analytics</h1>
              <p className="text-muted-foreground">AI-powered outbreak forecasting and trend analysis</p>
            </div>

            {/* Outbreak Prediction */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Next 5 Weeks Outbreak Projection</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={outbreakPredictionData}>
                  <defs>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="var(--color-secondary)"
                    fill="url(#colorPredicted)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Weather Correlation & Seasonality */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weather Correlation */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Weather Correlation</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weatherCorrelationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="cases"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      name="Cases"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="humidity"
                      stroke="var(--color-secondary)"
                      strokeWidth={2}
                      name="Humidity %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Seasonality */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Seasonal Pattern</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={seasonalityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cases" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Prediction Insights */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Predictive Insights</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Peak Expected</p>
                  <p className="text-2xl font-bold text-primary">Week 5</p>
                  <p className="text-xs text-muted-foreground mt-1">~128 cases projected</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <p className="text-sm text-muted-foreground mb-1">High Risk Duration</p>
                  <p className="text-2xl font-bold text-secondary">4 weeks</p>
                  <p className="text-xs text-muted-foreground mt-1">From current date</p>
                </div>
                <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <p className="text-sm text-muted-foreground mb-1">Confidence Score</p>
                  <p className="text-2xl font-bold text-destructive">78%</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on historical data</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
