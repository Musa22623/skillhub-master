
"use client"

import type React from "react"


interface StatCardProps {
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  name: string
  value: string
  percentage: string
  trend: "positive" | "negative" | "neutral"
  comparison: string
  footer: React.ReactNode | string
}

export default function StatCard({ icon, iconBg, iconColor, name, value, percentage, trend, comparison, footer }: StatCardProps) {
  const trendClasses = {
    positive: "bg-green-100/90 text-green-600",
    negative: "bg-red-100/90 text-red-600",
    neutral: "bg-slate-100/90 text-slate-500",
  }

  return (
    <div className=" min-w-[260px] w-[260px] bg-white rounded-xl p-4 border border-slate-200 ">
      <div className={`row-span-3 ${iconBg} ${iconColor} w-10 h-10 rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <div className="text-slate-500 text-sm font-semibold mt-0.5">{name}</div>
      <div className="text-slate-900 text-xl font-semibold flex items-center gap-2 flex-wrap">
        {value}
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${trendClasses[trend]}`}>{percentage}</span>
      </div>
      <div className="text-slate-500 text-xs">{comparison}</div>
      <div className="col-span-2 mt-3 pt-3 border-t border-slate-100">
        <div className="inline-flex items-center gap-1.5 text-sm text-slate-900 font-semibold">{footer}</div>
      </div>
    </div>
  )
}
