"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopNav } from "@/components/top-nav"
import { ChatProvider } from "@/components/chat-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Pill, Brain, BarChart3, CheckCircle2, AlertTriangle, AlertCircle, Phone } from "lucide-react"
import { useState } from "react"

const studentNavItems = [
  { href: "/student/dashboard", label: "Dashboard", icon: Home },
  { href: "/student/symptoms", label: "Report Symptoms", icon: Pill },
  { href: "/student/triage", label: "AI Triage", icon: Brain },
  { href: "/student/insights", label: "Health Insights", icon: BarChart3 },
]

const triageResults = [
  {
    level: "green",
    title: "Self-Care",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
    recommendations: ["Rest and stay hydrated", "Monitor symptoms", "Over-the-counter comfort measures"],
  },
  {
    level: "yellow",
    title: "OTC Medication",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    recommendations: [
      "Consider over-the-counter medication",
      "Consult pharmacist if needed",
      "Follow package directions",
    ],
  },
  {
    level: "orange",
    title: "Visit Campus Clinic",
    icon: AlertCircle,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    recommendations: ["Schedule appointment at clinic", "Bring symptom documentation", "Available: Mon-Fri 9am-6pm"],
  },
  {
    level: "red",
    title: "Emergency",
    icon: Phone,
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-900/20",
    recommendations: ["Call 911 immediately", "Go to nearest emergency room", "Inform healthcare provider of symptoms"],
  },
]

export default function AITriage() {
  const [symptoms, setSymptoms] = useState("")
  const [result, setResult] = useState<(typeof triageResults)[0] | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const analyzeSymptoms = () => {
    setAnalyzing(true)
    setTimeout(() => {
      const levels = triageResults
      setResult(levels[Math.floor(Math.random() * levels.length)])
      setAnalyzing(false)
    }, 1500)
  }

  return (
    <>
      <div className="flex h-screen bg-background">
        <SidebarNav items={studentNavItems} title="Student Portal" />

        <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
          <TopNav userName="Alex" />

          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="space-y-6 max-w-3xl">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">AI Triage Assistant</h1>
                <p className="text-muted-foreground">Describe your symptoms for AI-powered health assessment</p>
              </div>

              {/* Input Section */}
              <Card className="p-6">
                <label className="text-sm font-medium block mb-3">Describe Your Symptoms</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g., I have a fever of 101°F, persistent cough for 2 days, and mild fatigue..."
                  className="w-full p-4 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
                  rows={5}
                />
                <Button onClick={analyzeSymptoms} disabled={!symptoms.trim() || analyzing} className="w-full">
                  {analyzing ? "Analyzing..." : "Analyze with AI"}
                </Button>
              </Card>

              {/* Result Display */}
              {result && (
                <Card className={`p-6 ${result.bg} border-0`}>
                  <div className="flex gap-4 mb-4">
                    <result.icon className={`w-8 h-8 ${result.color} flex-shrink-0 mt-1`} />
                    <div>
                      <h3 className={`text-2xl font-bold ${result.color} mb-1`}>{result.title}</h3>
                      <p className="text-sm text-muted-foreground">Recommended action based on your symptoms</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-semibold mb-3">Recommendations:</p>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <span className="text-secondary mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Disclaimer:</strong> This assessment is AI-powered and not a substitute for professional
                      medical diagnosis. Always consult with healthcare professionals for persistent symptoms.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
      <ChatProvider />
    </>
  )
}
