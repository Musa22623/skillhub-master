"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  start?: number
  end: number
  duration?: number
  className?: string
  formatter?: (value: number) => string
  decimals?: number
}

export default function AnimatedCounter({
  start = 0,
  end,
  duration = 1500,
  className = "",
  formatter = (value) => value.toString(),
  decimals = 0,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(start)
  const counterRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    // Reset animation when end value changes
    setValue(start)
    startTimeRef.current = null

    // Cancel any existing animation frame
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
    }

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)

      // Calculate the current value with proper decimal precision
      const multiplier = Math.pow(10, decimals)
      const currentValue = progress * (end - start) + start
      const roundedValue = Math.round(currentValue * multiplier) / multiplier

      setValue(roundedValue)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      }
    }

    frameRef.current = requestAnimationFrame(step)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [start, end, duration, decimals])

  return (
    <span ref={counterRef} className={className}>
      {formatter(value)}
    </span>
  )
}
