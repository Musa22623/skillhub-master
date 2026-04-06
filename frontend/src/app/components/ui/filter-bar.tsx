"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  LayoutGrid,
  Star,
  Clock,
  ArrowUpWideNarrow,
  GraduationCapIcon as Graduation,
} from "lucide-react"

export default function FilterBar() {
  const [activeFilter, setActiveFilter] = useState<string | null>("")
  const wrapperRef = useRef<HTMLDivElement>(null)

  const toggleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter))
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setActiveFilter(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="flex items-center justify-between gap-2 mb-6 w-full flex-wrap"
    >
      <div className="flex gap-2 flex-wrap">
        {/* FILTERS START */}
        {[
          {
            key: "product",
            icon: <LayoutGrid className="w-4 h-4 opacity-70" />,
            label: "Product",
            options: ["Courses", "Events"],
          },
        ].map(({ key, icon, label, options }) => (
          <div key={key} className="relative">
            <button
              className={`px-4 py-2 bg-white border border-gray-200 rounded-full cursor-pointer flex items-center gap-1.5 text-sm text-gray-800 transition-all ${
                activeFilter === key
                  ? "bg-gray-50 border-gray-400"
                  : "hover:bg-gray-50 hover:border-gray-300"
              }`}
              onClick={() => toggleFilter(key)}
            >
              {icon}
              {label}
            </button>
            {activeFilter === key && (
              <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-md p-3 min-w-[200px] mt-2 z-50">
                {options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-gray-300 rounded"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* CATEGORY FILTER (moved here) */}
        <div className="relative">
          <button
            className={`px-4 py-2 bg-white border border-gray-200 rounded-full cursor-pointer flex items-center gap-1.5 text-sm text-gray-800 transition-all ${
              activeFilter === "category"
                ? "bg-gray-50 border-gray-400"
                : "hover:bg-gray-50 hover:border-gray-300"
            }`}
            onClick={() => toggleFilter("category")}
          >
            <LayoutGrid className="w-4 h-4 opacity-70" />
            Category
            <span className="bg-teal-500 text-white px-2 rounded-full text-xs ml-1">
              3
            </span>
          </button>
          {activeFilter === "category" && (
            <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-md p-3 min-w-[200px] mt-2 z-50">
              <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 border-2 border-gray-300 rounded"
                />
                Technology
              </label>
              <div className="ml-6 border-l border-gray-200 pl-3">
                <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 border-2 border-gray-300 rounded"
                  />
                  Programming
                </label>
                <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-2 border-gray-300 rounded"
                  />
                  AI & ML
                </label>
              </div>
              <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 border-2 border-gray-300 rounded"
                />
                Business
              </label>
              <div className="ml-6 border-l border-gray-200 pl-3">
                <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-2 border-gray-300 rounded"
                  />
                  Marketing
                </label>
                <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-2 border-gray-300 rounded"
                  />
                  Finance
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Continue with remaining filters */}
        {[
          {
            key: "rating",
            icon: <Star className="w-4 h-4 opacity-70" />,
            label: "Rating",
            options: [
              "5+ Stars",
              "4+ Stars",
              "3+ Stars",
              "2+ Stars",
              "1+ Stars",
              "No Rating",
            ],
          },
          {
            key: "progress",
            icon: <Clock className="w-4 h-4 opacity-70" />,
            label: "Progress",
            options: ["Started", "Not Started", "Finished"],
          },
          {
            key: "topics",
            icon: <LayoutGrid className="w-4 h-4 opacity-70" />,
            label: "Topics",
            options: ["Learning", "Career", "Personal", "Research"],
          },
          {
            key: "instructors",
            icon: <Graduation className="w-4 h-4 opacity-70" />,
            label: "Instructors",
            options: [
              "Bo Andersen",
              "Catalin Baba",
              "David Bombal",
              "Imran Afzal",
            ],
          },
        ].map(({ key, icon, label, options }) => (
          <div key={key} className="relative">
            <button
              className={`px-4 py-2 bg-white border border-gray-200 rounded-full cursor-pointer flex items-center gap-1.5 text-sm text-gray-800 transition-all ${
                activeFilter === key
                  ? "bg-gray-50 border-gray-400"
                  : "hover:bg-gray-50 hover:border-gray-300"
              }`}
              onClick={() => toggleFilter(key)}
            >
              {icon}
              {label}
            </button>
            {activeFilter === key && (
              <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-md p-3 min-w-[200px] mt-2 z-50">
                {options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-2 border-gray-300 rounded"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* FILTERS END */}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">Access To</span>
          <label className="relative inline-block w-11 h-6">
            <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition-all duration-300 rounded-full before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[3px] before:bottom-[3px] before:bg-white before:transition-all before:duration-300 before:rounded-full hover:bg-gray-400 peer-checked:bg-blue-500 peer-checked:before:translate-x-5"></span>
          </label>
        </div>

        {/* SORT BY */}
        <div className="relative">
          <button
            className={`px-4 py-2 bg-white border border-gray-200 rounded-full cursor-pointer flex items-center gap-1.5 text-sm text-gray-800 transition-all ${
              activeFilter === "sort"
                ? "bg-gray-50 border-gray-400"
                : "hover:bg-gray-50 hover:border-gray-300"
            }`}
            onClick={() => toggleFilter("sort")}
          >
          <ArrowUpWideNarrow size={20} className="opacity-70" />
            Sort By
          </button>
          {activeFilter === "sort" && (
            <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-md p-3 min-w-[200px] mt-2 z-50">
              {[
                "Recently Accessed",
                "Recently Enrolled",
                "Title: A-Z",
                "Title: Z-A",
              ].map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded"
                >
                  <input
                    type="radio"
                    name="sort"
                    className="w-4 h-4 border-2 border-gray-300 rounded-full"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
