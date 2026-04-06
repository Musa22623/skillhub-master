"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

import { Button } from "@/app/components/ui/button"
import { RefreshCw } from "lucide-react"
import AnimatedCounter from "../AnimatedCounter"

export default function AnimatedStatsCard() {
  const [key, setKey] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the stats after a small delay for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [key])

  const resetAnimation = () => {
    setIsVisible(false)
    setTimeout(() => {
      setKey((prev) => prev + 1)
    }, 300)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Instructor Statistics</CardTitle>
        <Button variant="ghost" size="icon" onClick={resetAnimation} className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div
          className="grid grid-cols-3 gap-4 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          key={key}
        >
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Watch mins</p>
            <AnimatedCounter
              end={196000000}
              duration={2000}
              className="text-2xl font-bold text-sky-600"
              formatter={(value) => `${Math.floor(value / 1000000)}M`}
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Rating</p>
            <AnimatedCounter
              end={4.9}
              duration={2000}
              className="text-2xl font-bold text-sky-600"
              formatter={(value) => value.toFixed(1)}
              decimals={1}
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Followers</p>
            <AnimatedCounter
              end={90000}
              duration={2000}
              className="text-2xl font-bold text-sky-600"
              formatter={(value) => `${Math.floor(value / 1000)}K`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
