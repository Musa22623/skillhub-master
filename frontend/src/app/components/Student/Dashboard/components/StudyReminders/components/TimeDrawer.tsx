"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface TimeDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSave: (time: string, amPm: string) => void
  onRemove: () => void
  initialTime?: string
  initialAmPm?: string
}

export default function TimeDrawer({
  isOpen,
  onClose,
  onSave,
  onRemove,
  initialTime = "07:15",
  initialAmPm = "PM",
}: TimeDrawerProps) {
  const [timeInput, setTimeInput] = useState(initialTime)
  const [amPm, setAmPm] = useState(initialAmPm)
  const drawerRef = useRef<HTMLDivElement>(null)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchDeltaY, setTouchDeltaY] = useState(0)

  // Reset values when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeInput(initialTime)
      setAmPm(initialAmPm)
      setTouchDeltaY(0)
    }
  }, [isOpen, initialTime, initialAmPm])

  // Handle touch events for swipe down to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY
    const deltaY = currentY - touchStartY

    if (deltaY > 0) {
      // Only allow swiping down
      setTouchDeltaY(deltaY)
    }
  }

  const handleTouchEnd = () => {
    if (touchDeltaY > 100) {
      // If swiped down more than 100px
      onClose()
    }
    setTouchDeltaY(0)
  }

  // Handle save action
  const handleSave = () => {
    onSave(timeInput, amPm)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 z-50 transition-transform"
        style={{ transform: touchDeltaY > 0 ? `translateY(${touchDeltaY}px)` : "translateY(0)" }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <h3 className="text-base font-semibold text-gray-800 mb-4 text-center">Set Reminder Time</h3>

        <div className="flex items-center justify-center gap-3 mb-5">
          <input
            type="time"
            className="w-24 h-9 border border-gray-200 rounded-lg text-center text-sm text-gray-800"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
          />
          <div className="flex gap-1">
            <button
              className={`px-3 py-2 border rounded-lg text-xs ${
                amPm === "AM" ? "bg-teal-500 text-white border-teal-500" : "bg-white text-gray-500 border-gray-200"
              }`}
              onClick={() => setAmPm("AM")}
            >
              AM
            </button>
            <button
              className={`px-3 py-2 border rounded-lg text-xs ${
                amPm === "PM" ? "bg-teal-500 text-white border-teal-500" : "bg-white text-gray-500 border-gray-200"
              }`}
              onClick={() => setAmPm("PM")}
            >
              PM
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 py-3 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-500"
            onClick={onRemove}
          >
            Remove
          </button>
          <button
            className="flex-1 py-3 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 rounded-lg text-sm font-semibold bg-teal-500 border border-teal-500 text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
