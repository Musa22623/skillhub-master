import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CalendarPopupProps {
  onDateSelect?: (date: Date) => void;
}

const CalendarPopup = ({ onDateSelect }: CalendarPopupProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0")
  );
  const periods = ["AM", "PM"];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
      period === "PM" ? parseInt(hour) + 12 : parseInt(hour),
      parseInt(minute)
    );
    setSelectedDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  const monthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-2 bg-white rounded-md">
      <div className="flex justify-between items-center mb-4">
        <button
          className="p-1 hover:bg-gray-100 rounded"
          onClick={handlePrevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h3 className="font-medium">{monthYear}</h3>
        <button
          className="p-1 hover:bg-gray-100 rounded"
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-xs text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} className="h-8 w-8" />
        ))}
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const isSelected =
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === currentDate.getMonth() &&
            selectedDate?.getFullYear() === currentDate.getFullYear();
          const isToday =
            today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`h-8 w-8 rounded-full text-sm ${
                isSelected
                  ? "bg-[#13C4CC] text-white"
                  : isToday
                  ? "border-2 border-[#13C4CC] hover:bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time
        </label>
        <div className="flex gap-2">
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#13C4CC] flex-1"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          >
            {hours.map((hr) => (
              <option key={hr} value={hr}>
                {hr}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#13C4CC] flex-1"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          >
            {minutes.map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#13C4CC] flex-1"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            {periods.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CalendarPopup;
