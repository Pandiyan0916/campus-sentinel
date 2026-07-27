"use client"

import { Card } from "@/components/ui/card"
import { Cloud, Droplets, Wind } from "lucide-react"

export function WeatherPanel() {
  return (
    <Card className="p-4">
      <p className="text-sm font-semibold mb-4">Environmental Factors</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Humidity</span>
          </div>
          <span className="font-medium">65%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">Air Quality</span>
          </div>
          <span className="font-medium">Good</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Temperature</span>
          </div>
          <span className="font-medium">72°F</span>
        </div>
      </div>
    </Card>
  )
}
