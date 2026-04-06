"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { TimeStampSVG, ListSvg, ChevronLeft,ChevronRight } from "@/app/components/svg"
import { CalendarIcon as Calendar1 } from "lucide-react"

// Define TypeScript interfaces for our data structures
interface CalendarDay {
  day: number
  month: "prev" | "current" | "next"
}

interface Event {
  id: number
  date: string
  title: string
  time: string
  type: "zoom-meeting" | "zoom-webinar" | "webex-meeting" | "teams-meeting" | "one-on-one" | "group-session"
  attendees: number
}

interface ExpandedCells {
  [key: number]: boolean
}

const Calendar: React.FC = () => {
  // State for current date and view
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [expandedCells, setExpandedCells] = useState<ExpandedCells>({})

  // Get today's date for highlighting
  const today = new Date()
  const isToday = (day: number, month: number, year: number) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  // Format current month and year for display
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  // Mock data for events - we'll modify this to work with the current month
  const generateEvents = (date: Date): Event[] => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // JavaScript months are 0-indexed
    const monthStr = month < 10 ? `0${month}` : `${month}`

    // Base events that will be shown in any month
    const baseEvents: Event[] = [
      {
        id: 1,
        date: `${year}-${monthStr}-01`,
        title: "FREE 4D Copy Call",
        time: "9:00 AM",
        type: "zoom-meeting",
        attendees: 12,
      },
      {
        id: 2,
        date: `${year}-${monthStr}-07`,
        title: "FREE 4D Copy Call",
        time: "9:00 AM",
        type: "zoom-meeting",
        attendees: 12,
      },
      {
        id: 3,
        date: `${year}-${monthStr}-07`,
        title: "Team Strategy Session",
        time: "11:00 AM",
        type: "teams-meeting",
        attendees: 8,
      },
      {
        id: 4,
        date: `${year}-${monthStr}-07`,
        title: "1:1 Coaching Session",
        time: "2:00 PM",
        type: "one-on-one",
        attendees: 2,
      },
      {
        id: 5,
        date: `${year}-${monthStr}-07`,
        title: "Product Demo",
        time: "3:30 PM",
        type: "webex-meeting",
        attendees: 6,
      },
      {
        id: 6,
        date: `${year}-${monthStr}-07`,
        title: "Group Workshop",
        time: "4:30 PM",
        type: "group-session",
        attendees: 10,
      },
      {
        id: 7,
        date: `${year}-${monthStr}-08`,
        title: "Career Planning Session",
        time: "10:00 AM",
        type: "one-on-one",
        attendees: 2,
      },
      {
        id: 8,
        date: `${year}-${monthStr}-15`,
        title: "Marketing Masterclass",
        time: "2:00 PM",
        type: "zoom-webinar",
        attendees: 25,
      },
      {
        id: 9,
        date: `${year}-${monthStr}-28`,
        title: "Sales Meeting",
        time: "9:00 AM",
        type: "zoom-meeting",
        attendees: 12,
      },
      {
        id: 10,
        date: `${year}-${monthStr}-28`,
        title: "Team Planning",
        time: "10:30 AM",
        type: "teams-meeting",
        attendees: 8,
      },
      {
        id: 11,
        date: `${year}-${monthStr}-28`,
        title: "Coaching Call",
        time: "1:00 PM",
        type: "one-on-one",
        attendees: 2,
      },
      {
        id: 12,
        date: `${year}-${monthStr}-28`,
        title: "Product Review",
        time: "2:30 PM",
        type: "webex-meeting",
        attendees: 6,
      },
      {
        id: 13,
        date: `${year}-${monthStr}-28`,
        title: "Team Workshop",
        time: "4:00 PM",
        type: "group-session",
        attendees: 15,
      },
      {
        id: 14,
        date: `${year}-${monthStr}-29`,
        title: "1:1 Coaching Session",
        time: "11:00 AM",
        type: "one-on-one",
        attendees: 2,
      },
    ]

    // Add today's special event if we're viewing the current month
    if (month === today.getMonth() + 1 && year === today.getFullYear()) {
      const todayStr = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`
      baseEvents.push({
        id: 100,
        date: `${year}-${monthStr}-${todayStr}`,
        title: "TODAY'S SPECIAL EVENT",
        time: "12:00 PM",
        type: "zoom-webinar",
        attendees: 30,
      })
    }

    return baseEvents
  }

  // Get events based on current date
  const [events, setEvents] = useState<Event[]>(generateEvents(currentDate))

  // Update events when current date changes
  useEffect(() => {
    setEvents(generateEvents(currentDate))
  }, [currentDate])

  // Generate calendar grid
  const generateCalendarDays = (date: Date): CalendarDay[] => {
    const year = date.getFullYear()
    const month = date.getMonth()

    // First day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

    // Last day of previous month
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate()

    const days: CalendarDay[] = []

    // Previous month days
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({ day: lastDayOfPrevMonth - i, month: "prev" })
    }

    // Current month days
    for (let i = 1; i <= lastDayOfMonth; i++) {
      days.push({ day: i, month: "current" })
    }

    // Next month days (to fill a 6-row grid)
    const remainingDays = 42 - days.length // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, month: "next" })
    }

    return days
  }

  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>(generateCalendarDays(currentDate))

  // Update calendar days when current date changes
  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentDate))
  }, [currentDate])

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get events for a specific day
  const getEventsForDay = (day: number, month: "prev" | "current" | "next"): Event[] => {
    if (month !== "current") return []

    const year = currentDate.getFullYear()
    const monthNum = currentDate.getMonth() + 1 // JavaScript months are 0-indexed
    const monthStr = monthNum < 10 ? `0${monthNum}` : `${monthNum}`
    const dayStr = day < 10 ? `0${day}` : `${day}`

    const dateStr = `${year}-${monthStr}-${dayStr}`
    return events.filter((event) => event.date === dateStr)
  }

  // Toggle more events
  const toggleMoreEvents = (day: number): void => {
    setExpandedCells((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }

  // Toggle event expansion
  const toggleEventExpansion = (eventId: number): void => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId)
  }

  // Get weekday for list view
  const getWeekday = (day: number): string => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return weekdays[date.getDay()]
  }

  // Get days with events for list view
  const daysWithEvents = [
    ...new Set(
      events.map((event) => {
        const day = Number.parseInt(event.date.split("-")[2])
        return day
      }),
    ),
  ].sort((a: number, b: number) => a - b)

  return (
    <div className="">
      <div className="w-full max-w-6xl relative overflow-hidden">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6 relative bg-white">
          <div className="flex items-center gap-6">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">{formatMonthYear(currentDate)}</h2>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 border border-gray-200 rounded text-sm font-semibold text-gray-500 hover:bg-gray-50"
              onClick={goToToday}
            >
              Today
            </button>
            <div className="flex bg-gray-100 rounded-md p-0.5">
              <button
                className={`px-3 py-1.5 rounded-md flex items-center gap-1 ${view === "list" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setView("list")}
              >
                <ListSvg />
              </button>
              <button
                className={`px-3 py-1.5 rounded-md flex items-center gap-1 ${view === "calendar" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setView("calendar")}
              >
                <Calendar1 />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="relative">
          {/* Calendar View */}
          {view === "calendar" && (
            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200">
              {/* Weekday Headers */}
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={i} className="bg-white p-3 text-center font-semibold text-gray-500">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, i) => {
                const dayEvents = getEventsForDay(day.day, day.month)
                const visibleEvents = dayEvents.slice(0, 3)
                const hiddenEvents = dayEvents.slice(3)
                const isExpanded = expandedCells[day.day] || false
                const isTodayCell =
                  day.month === "current" && isToday(day.day, currentDate.getMonth(), currentDate.getFullYear())

                return (
                  <div
                    key={i}
                    className={`bg-white min-h-32 p-2 flex flex-col gap-0.5 relative ${isTodayCell ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <div
                      className={`text-sm font-semibold ${
                        day.month === "current"
                          ? isTodayCell
                            ? "text-blue-600 bg-blue-50 rounded-full w-6 h-6 flex items-center justify-center"
                            : "text-gray-900"
                          : "text-gray-400"
                      } mb-1`}
                    >
                      {day.day}
                    </div>

                    {/* Visible Events */}
                    {visibleEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`p-0.5 px-2 rounded cursor-pointer border-l-3 ${expandedEvent === event.id ? "bg-gray-50" : ""} 
                          ${event.type === "zoom-meeting" ? "border-l-[#15B7C3]" : ""}
                          ${event.type === "zoom-webinar" ? "border-l-[#22C376]" : ""}
                          ${event.type === "webex-meeting" ? "border-l-[#F89E6C]" : ""}
                          ${event.type === "teams-meeting" ? "border-l-[#608CFD]" : ""}
                          ${event.type === "one-on-one" ? "border-l-[#E47EF4]" : ""}
                          ${event.type === "group-session" ? "border-l-[#EE4206]" : ""}
                          ${isTodayCell ? "bg-blue-50/50" : ""}`}
                        onClick={() => toggleEventExpansion(event.id)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`text-xs font-semibold truncate 
                            ${event.type === "zoom-meeting" ? "text-[#15B7C3]" : ""}
                            ${event.type === "zoom-webinar" ? "text-[#22C376]" : ""}
                            ${event.type === "webex-meeting" ? "text-[#F89E6C]" : ""}
                            ${event.type === "teams-meeting" ? "text-[#608CFD]" : ""}
                            ${event.type === "one-on-one" ? "text-[#E47EF4]" : ""}
                            ${event.type === "group-session" ? "text-[#EE4206]" : ""}`}
                          >
                            {event.title}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <TimeStampSVG />
                          {event.time}
                        </div>

                        {expandedEvent === event.id && (
                          <div className="flex items-center gap-1 mt-2">
                            <div className="flex mr-1">
                              <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200">
                                <Image
                                  src="https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg"
                                  alt="imag"
                                  width={200}
                                  height={100}
                                />
                              </div>
                              <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300 -ml-2">
                                <Image
                                  src="https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg"
                                  alt="imag"
                                  width={200}
                                  height={100}
                                />
                              </div>
                            </div>
                            <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-500">
                              {event.attendees}+
                            </span>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Hidden Events */}
                    {isExpanded &&
                      hiddenEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`p-0.5 px-2 rounded cursor-pointer border-l-3
                          ${event.type === "zoom-meeting" ? "border-l-[#15B7C3]" : ""}
                          ${event.type === "zoom-webinar" ? "border-l-[#22C376]" : ""}
                          ${event.type === "webex-meeting" ? "border-l-[#F89E6C]" : ""}
                          ${event.type === "teams-meeting" ? "border-l-[#608CFD]" : ""}
                          ${event.type === "one-on-one" ? "border-l-[#E47EF4]" : ""}
                          ${event.type === "group-session" ? "border-l-[#EE4206]" : ""}
                          ${isTodayCell ? "bg-blue-50/50" : ""}`}
                          onClick={() => toggleEventExpansion(event.id)}
                        >
                          <div className="flex items-center">
                            <div
                              className={`text-xs font-semibold truncate
                            ${event.type === "zoom-meeting" ? "text-[#15B7C3]" : ""}
                            ${event.type === "zoom-webinar" ? "text-[#22C376]" : ""}
                            ${event.type === "webex-meeting" ? "text-[#F89E6C]" : ""}
                            ${event.type === "teams-meeting" ? "text-[#608CFD]" : ""}
                            ${event.type === "one-on-one" ? "text-[#E47EF4]" : ""}
                            ${event.type === "group-session" ? "text-[#EE4206]" : ""}`}
                            >
                              {event.title}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <TimeStampSVG />
                            {event.time}
                          </div>
                        </div>
                      ))}

                    {/* More Events Button */}
                    {hiddenEvents.length > 0 && (
                      <button
                        className="absolute bottom-2 left-2 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500 hover:bg-gray-100"
                        onClick={() => toggleMoreEvents(day.day)}
                      >
                        {isExpanded ? "Show Less" : `${hiddenEvents.length} More`}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* List View */}
          {view === "list" && (
            <div className="grid gap-6">
              {daysWithEvents.map((day) => {
                const dayEvents = getEventsForDay(day, "current")
                const weekday = getWeekday(day)
                const isCurrentDay = isToday(day, currentDate.getMonth(), currentDate.getFullYear())

                return dayEvents.length > 0 ? (
                  <div key={day} className={`flex p-6 border-b border-gray-200 ${isCurrentDay ? "bg-blue-50/30" : ""}`}>
                    <div className={`w-20 text-center pr-4 relative ${isCurrentDay ? "text-blue-600" : ""}`}>
                      <div className={`text-base font-semibold ${isCurrentDay ? "text-blue-600" : "text-gray-500"}`}>
                        {weekday}
                      </div>
                      <div className={`text-3xl font-semibold ${isCurrentDay ? "text-blue-600" : "text-gray-800"}`}>
                        {day}
                        {isCurrentDay && (
                          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`flex items-start gap-4 mb-4 ${isCurrentDay ? "bg-blue-50/50 p-2 rounded" : ""}`}
                        >
                          <div
                            className={`flex-grow flex flex-col border-l-3 pl-2
                            ${event.type === "zoom-meeting" ? "border-l-[#15B7C3]" : ""}
                            ${event.type === "zoom-webinar" ? "border-l-[#22C376]" : ""}
                            ${event.type === "webex-meeting" ? "border-l-[#F89E6C]" : ""}
                            ${event.type === "teams-meeting" ? "border-l-[#608CFD]" : ""}
                            ${event.type === "one-on-one" ? "border-l-[#E47EF4]" : ""}
                            ${event.type === "group-session" ? "border-l-[#EE4206]" : ""}`}
                          >
                            <div
                              className={`text-base font-semibold mb-1
                              ${event.type === "zoom-meeting" ? "text-[#15B7C3]" : ""}
                              ${event.type === "zoom-webinar" ? "text-[#22C376]" : ""}
                              ${event.type === "webex-meeting" ? "text-[#F89E6C]" : ""}
                              ${event.type === "teams-meeting" ? "text-[#608CFD]" : ""}
                              ${event.type === "one-on-one" ? "text-[#E47EF4]" : ""}
                              ${event.type === "group-session" ? "text-[#EE4206]" : ""}`}
                            >
                              {event.title}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <TimeStampSVG />
                              {event.time}
                              <div className="flex ml-2">
                                <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200">
                                  <Image
                                    src="https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg"
                                    alt="imag"
                                    width={200}
                                    height={100}
                                  />
                                </div>
                                <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300 -ml-2">
                                  <Image
                                    src="https://i.ibb.co/gLQM1bhc/AVATAR-midtone-ux-instrgram.jpg"
                                    alt="imag"
                                    width={200}
                                    height={100}
                                  />
                                </div>
                              </div>
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">
                                {event.attendees}+
                              </span>
                            </div>
                          </div>

                          <div className="w-24 h-16 mb-4 bg-gray-200 rounded-lg flex-shrink-0">
                            <Image src="https://i.ibb.co/jJ4GHXP/img1.jpg" alt="imag" width={200} height={100} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calendar;
