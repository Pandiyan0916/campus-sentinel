"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react"

interface RiskScoreCardProps {
  score: number
  label?: string
}

export function RiskScoreCard({ score, label = "Campus Risk Score" }: RiskScoreCardProps) {
  const getStatus = (s: number) => {
    if (s < 30)
      return { color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", icon: CheckCircle2, status: "Low Risk" }
    if (s < 70)
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        icon: AlertTriangle,
        status: "Medium Risk",
      }
    return { color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20", icon: AlertCircle, status: "High Risk" }
  }

  const status = getStatus(score)
  const Icon = status.icon

  return (
    <Card className={`p-6 ${status.bg} border-0 fade-in hover:shadow-md transition-smooth`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className={`text-4xl font-bold ${status.color}`}>{score}</p>
          <p className={`text-xs font-medium mt-2 ${status.color}`}>{status.status}</p>
        </div>
        <Icon className={`w-8 h-8 ${status.color} pulse-soft`} />
      </div>
    </Card>
  )
}
