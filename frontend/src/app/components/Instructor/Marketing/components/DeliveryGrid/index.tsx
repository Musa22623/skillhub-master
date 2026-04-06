"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"



export default function DeliveryGrid() {
  const [viewMode, setViewMode] = useState<"percentage" | "count">("percentage")

  const deliveryData = {
    percentage: [85, 65, 92, 78, 88, 72, 95], // Mon-Sun delivery percentages
    count: [8500, 6500, 9200, 7800, 8800, 7200, 9500], // Mon-Sun delivery counts
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const percentageLabels = ["100%", "80%", "60%", "40%", "20%"]
  const countLabels = ["10000", "8000", "6000", "4000", "2000"]

  const labels = viewMode === "percentage" ? percentageLabels : countLabels

  return (
    <div className="">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-2">DELIVERED</h2>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#142E53]">{78.5}%</span>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-[rgba(2,197,175,0.12)] text-[#02C5AF]">
              +{7.5}%
            </span>
          </div>
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[rgba(19,196,204,0.08)]">
          <Mail className="w-6 h-6 text-[#13C4CC]" />
        </div>
      </div>

      <div className="flex justify-end gap-0.5 mb-5">
        <button
          className={cn(
        "px-4 py-2 text-sm border border-gray-200 first:rounded-l-md last:rounded-r-md transition-colors",
        viewMode === "percentage" ? "bg-[#13C4CC] text-white border-[#13C4CC]" : "bg-white text-[#3B6E91]",
          )}
          onClick={() => setViewMode("percentage")}
        >
          Percentage
        </button>
        <button
          className={cn(
        "px-4 py-2 text-sm border border-gray-200 first:rounded-l-md last:rounded-r-md transition-colors",
        viewMode === "count" ? "bg-[#13C4CC] text-white border-[#13C4CC]" : "bg-white text-[#3B6E91]",
          )}
          onClick={() => setViewMode("count")}
        >
          Count
        </button>
      </div>

      <div className="relative pl-10 h-[280px]">
        <div className="absolute left-0 top-3 h-[216px] flex flex-col justify-between text-xs text-[#3B6E91]">
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 h-[240px]">
          {days.map((day, dayIndex) => {
            const value = deliveryData[viewMode][dayIndex]
            const maxValue = Math.max(...deliveryData[viewMode])
            const minValue = Math.min(...deliveryData[viewMode])
            const opacity = 0.2 + ((value - minValue) / (maxValue - minValue)) * 0.8

            return (
              <div key={day} className="grid grid-rows-5 gap-2">
                {Array.from({ length: 5 }).map((_, cellIndex) => {
                  const thresholds = viewMode === "percentage" ? [80, 60, 40, 20, 0] : [8000, 6000, 4000, 2000, 0]

                  const isActive =
                    value >= thresholds[cellIndex] && (cellIndex === 0 || value < thresholds[cellIndex - 1])

                  return (
                    <div
                      key={cellIndex}
                      className={cn(
                        "rounded-md",
                        isActive
                          ? "flex items-center justify-center text-white text-xs font-medium"
                          : "bg-[rgba(19,196,204,0.1)]",
                      )}
                      style={isActive ? { backgroundColor: `rgba(19, 196, 204, ${opacity})` } : {}}
                    >
                      {isActive && (viewMode === "percentage" ? `${value}%` : value.toLocaleString())}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-7 gap-2 mt-2 text-center text-xs text-[#3B6E91]">
          {days.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
