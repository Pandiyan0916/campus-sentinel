"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings, User } from "lucide-react"

interface TopNavProps {
  userName?: string
  hasNotifications?: boolean
}

export function TopNav({ userName = "Student", hasNotifications = false }: TopNavProps) {
  return (
    <div className="border-b border-border bg-white dark:bg-slate-950">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Welcome back, {userName}</h2>
          <p className="text-xs text-muted-foreground">Monitor your campus health in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {hasNotifications && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />}
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
