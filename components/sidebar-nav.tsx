"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface SidebarNavProps {
  items: NavItem[]
  title: string
  isAdmin?: boolean
}

export function SidebarNav({ items, title, isAdmin = false }: SidebarNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Header with Menu Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-white dark:bg-slate-950 z-40 flex items-center px-4">
        <Button variant="ghost" size="sm" onClick={() => setOpen(!open)} className="mr-3">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <Link href={isAdmin ? "/admin" : "/student/dashboard"} className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold">Campus Sentinel</span>
        </Link>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen border-r border-border bg-sidebar transition-all duration-300 z-50",
          open ? "w-64" : "w-0",
          "md:relative md:w-64 md:z-0 md:transition-none",
        )}
      >
        <div className="p-6 space-y-8 pt-8 md:pt-6">
          {/* Logo - Hidden on mobile, shown on md+ */}
          <Link href={isAdmin ? "/admin" : "/student/dashboard"} className="hidden md:flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <div>
              <p className="font-bold text-sm">Campus Sentinel</p>
              <p className="text-xs text-muted-foreground">{title}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                  pathname === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="outline" className="w-full text-xs bg-transparent">
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 md:hidden z-40" onClick={() => setOpen(false)} />}
    </>
  )
}
