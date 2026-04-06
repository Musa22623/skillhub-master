"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Leaderboard } from "./leaderboard"

export function LeaderboardSection() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-8">
      <div
        className="flex cursor-pointer items-center justify-between border-b pb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold text-gray-800">7 Day Leaderboard</h2>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Leaderboard title="Course Leaderboard" type="course" />
          <Leaderboard title="Event Leaderboard" type="event" />
          <Leaderboard title="Community Leaderboard" type="community" />
        </div>
      )}
    </div>
  )
}
