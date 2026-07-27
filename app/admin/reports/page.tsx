"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopNav } from "@/components/top-nav"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, AlertTriangle, Pill, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: TrendingUp },
  { href: "/admin/heatmap", label: "Campus Heatmap", icon: Users },
  { href: "/admin/prediction", label: "Disease Prediction", icon: AlertTriangle },
  { href: "/admin/resources", label: "Clinic Resources", icon: Pill },
  { href: "/admin/reports", label: "Student Reports", icon: Users },
]

const allReports = [
  {
    id: 1,
    date: "2024-01-15 14:32",
    symptoms: "Fever, Cough",
    severity: "Moderate",
    zone: "East Dorm",
    status: "Reviewed",
  },
  { id: 2, date: "2024-01-15 13:45", symptoms: "Headache", severity: "Mild", zone: "North Campus", status: "Reviewed" },
  {
    id: 3,
    date: "2024-01-15 12:18",
    symptoms: "Fatigue, Fever",
    severity: "High",
    zone: "West Quad",
    status: "Pending",
  },
  {
    id: 4,
    date: "2024-01-15 11:02",
    symptoms: "Cold, Cough",
    severity: "Mild",
    zone: "Library Zone",
    status: "Reviewed",
  },
  {
    id: 5,
    date: "2024-01-15 10:15",
    symptoms: "Stomach Issues",
    severity: "Moderate",
    zone: "Athletic Center",
    status: "Reviewed",
  },
  {
    id: 6,
    date: "2024-01-15 09:47",
    symptoms: "Fever, Headache, Fatigue",
    severity: "High",
    zone: "East Dorm",
    status: "Pending",
  },
  { id: 7, date: "2024-01-14 16:23", symptoms: "Cough", severity: "Mild", zone: "South Campus", status: "Reviewed" },
  {
    id: 8,
    date: "2024-01-14 15:01",
    symptoms: "Fever",
    severity: "Moderate",
    zone: "North Campus",
    status: "Reviewed",
  },
]

export default function StudentReports() {
  const [filterSeverity, setFilterSeverity] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filteredReports = allReports.filter((report) => {
    if (filterSeverity && report.severity !== filterSeverity) return false
    if (filterStatus && report.status !== filterStatus) return false
    return true
  })

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav items={adminNavItems} title="Admin Portal" isAdmin />

      <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
        <TopNav userName="Dr. Smith" />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="space-y-6 max-w-7xl">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Student Symptom Reports</h1>
              <p className="text-muted-foreground">All anonymous reports from student submissions</p>
            </div>

            {/* Filters */}
            <Card className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <Filter className="w-4 h-4 text-muted-foreground md:mt-1" />
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterSeverity === "Mild" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterSeverity(filterSeverity === "Mild" ? null : "Mild")}
                >
                  Mild
                </Button>
                <Button
                  variant={filterSeverity === "Moderate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterSeverity(filterSeverity === "Moderate" ? null : "Moderate")}
                >
                  Moderate
                </Button>
                <Button
                  variant={filterSeverity === "High" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterSeverity(filterSeverity === "High" ? null : "High")}
                >
                  High
                </Button>
                <div className="border-l border-border mx-2" />
                <Button
                  variant={filterStatus === "Pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(filterStatus === "Pending" ? null : "Pending")}
                >
                  Pending
                </Button>
                <Button
                  variant={filterStatus === "Reviewed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(filterStatus === "Reviewed" ? null : "Reviewed")}
                >
                  Reviewed
                </Button>
              </div>
            </Card>

            {/* Reports Table */}
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Date/Time</th>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Symptoms</th>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Severity</th>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Zone</th>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-3 text-xs">{report.date}</td>
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
                        <td className="py-3 px-3 text-xs">{report.zone}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              report.status === "Pending"
                                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            }`}
                          >
                            {report.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">{filteredReports.length} reports shown</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
