"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopNav } from "@/components/top-nav"
import { ChatProvider } from "@/components/chat-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Pill, Brain, BarChart3, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const studentNavItems = [
  { href: "/student/dashboard", label: "Dashboard", icon: Home },
  { href: "/student/symptoms", label: "Report Symptoms", icon: Pill },
  { href: "/student/triage", label: "AI Triage", icon: Brain },
  { href: "/student/insights", label: "Health Insights", icon: BarChart3 },
]

const symptoms = [
  { id: "fever", label: "Fever" },
  { id: "cough", label: "Cough" },
  { id: "headache", label: "Headache" },
  { id: "cold", label: "Cold/Runny Nose" },
  { id: "fatigue", label: "Fatigue" },
  { id: "stomach", label: "Stomach Issues" },
]

export default function SymptomReporter() {
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [other, setOther] = useState("")

  const toggleSymptom = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <>
      <div className="flex h-screen bg-background">
        <SidebarNav items={studentNavItems} title="Student Portal" />

        <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
          <TopNav userName="Alex" />

          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="space-y-6 max-w-2xl">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">Report Symptoms</h1>
                <p className="text-muted-foreground">
                  Help protect the campus by sharing your health status anonymously
                </p>
              </div>

              {/* Success State */}
              {submitted && (
                <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-100">Symptom Submitted Anonymously</p>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        Thank you for helping us keep campus healthy!
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Symptoms Selection */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Select Your Symptoms</h3>
                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-3 border rounded-lg transition-colors text-left ${
                        selected.includes(symptom.id)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-white dark:bg-slate-950 hover:border-primary/50"
                      }`}
                    >
                      <p className="text-sm font-medium">{symptom.label}</p>
                    </button>
                  ))}
                </div>

                {/* Other Symptoms */}
                <div className="mb-6">
                  <label className="text-sm font-medium block mb-2">Other Symptoms (Optional)</label>
                  <textarea
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    placeholder="Describe any other symptoms..."
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    rows={3}
                  />
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <label className="text-sm font-medium block mb-2">Duration</label>
                  <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                    <option>Less than 24 hours</option>
                    <option>1-3 days</option>
                    <option>3-7 days</option>
                    <option>More than a week</option>
                  </select>
                </div>

                {/* Submit Button */}
                <Button onClick={handleSubmit} className="w-full" disabled={selected.length === 0}>
                  Submit Anonymously
                </Button>
              </Card>
            </div>
          </main>
        </div>
      </div>
      <ChatProvider />
    </>
  )
}
