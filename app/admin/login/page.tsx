"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Activity, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Activity className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Admin & Clinic Portal</h1>
            <p className="text-sm text-muted-foreground">Healthcare professional access</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@clinic.edu"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
            </div>

            <Link href="/admin/dashboard">
              <Button className="w-full bg-secondary hover:bg-secondary/90">Sign In</Button>
            </Link>
          </div>

          {/* Demo Link */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground mb-3">Demo Credentials</p>
            <p className="text-xs text-center text-muted-foreground">Email: admin@clinic.edu</p>
            <p className="text-xs text-center text-muted-foreground">Password: admin123</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
