import { useState } from "react";

const CalendarPopup = () => {
  // Use Date objects instead of dayjs for simplicity
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("12:00");

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };


  const handleDateSelect = (day: number | null) => {
    if (!day) return;
    
    const newDate = new Date(currentMonth);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  // Get calendar data
  const getMonthData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    
    // Total days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Add empty cells for days before the 1st of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const days = getMonthData();
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  
  // Check if a day is selected
  const isSelected = (day: number | null) => {
    if (!selectedDate || !day) return false;
    
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth.getMonth() &&
           selectedDate.getFullYear() === currentMonth.getFullYear();
  };
  
  // Format the selected datetime for display
  const getSelectedDateTime = () => {
    if (!selectedDate) return "No date selected";
    
    const date = selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return `${date} at ${selectedTime}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-64">
      <div className="flex justify-between items-center font-semibold text-gray-800 mb-4">
        <button
          onClick={handlePrevMonth}
          className="bg-white border text-blue-600 px-3 py-1 rounded text-sm font-semibold cursor-pointer"
        >
          &lt;
        </button>
        <span>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
        <button
          onClick={handleNextMonth}
          className="bg-white border text-blue-600 px-3 py-1 rounded text-sm font-semibold cursor-pointer"
        >
          &gt;
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-xs font-semibold text-gray-700 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Dates */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((day, i) => (
          <div
            key={i}
            className={`text-center text-sm p-2 ${
              day ? "cursor-pointer hover:bg-gray-100 rounded" : ""
            } ${
              isSelected(day) ? "bg-blue-500 text-white hover:bg-blue-600 rounded" : ""
            }`}
            onClick={() => handleDateSelect(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {/* Time Picker */}
      <div className="mt-4 pt-2 border-t">
        <label className="block text-sm text-gray-700 mb-1">Time:</label>
        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="w-full border text-sm text-gray-700 p-2 rounded"
        />
      </div>
      
      {/* Selection Display */}
      <div className="mt-4 pt-2 border-t text-sm">
        <p className="font-medium">Selected:</p>
        <p className="text-blue-600">{getSelectedDateTime()}</p>
      </div>
    </div>
  );
};

export default CalendarPopup;