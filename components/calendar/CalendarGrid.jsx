"use client";

export default function CalendarGrid({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  notes,
}) {
  const currentDate = new Date();
  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  //  Helpers
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  const getStartDay = (y, m) => {
    const day = new Date(y, m, 1).getDay();
    return (day + 6) % 7;
  };

  const daysInCurrentMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const calendarDays = [];

  //  Previous Month
  for (let i = startDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    calendarDays.push({
      day,
      currentMonth: false,
      date: new Date(year, month - 1, day),
    });
  }

  //  Current Month
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push({
      day: i,
      currentMonth: true,
      date: new Date(year, month, i),
    });
  }

  //  Next Month
  const remaining = 42 - calendarDays.length;

  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({
      day: i,
      currentMonth: false,
      date: new Date(year, month + 1, i),
    });
  }

  // Date Click Handler
  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  //  Range Check
  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  //  Note Indicator Logic
  const hasNote = (date) => {
    return notes.some(
      (note) =>
        date >= new Date(note.startDate) &&
        date <= new Date(note.endDate)
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {calendarDays.map((item, index) => {
          const isToday =
            item.currentMonth &&
            item.date.toDateString() === today.toDateString();

          const isStart =
            startDate &&
            item.date.toDateString() === startDate.toDateString();

          const isEnd =
            endDate &&
            item.date.toDateString() === endDate.toDateString();

          const inRange = isInRange(item.date);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(item.date)}
              className={`relative aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all
                ${
                  item.currentMonth
                    ? "font-bold text-black hover:bg-blue-100"
                    : "text-gray-400"
                }

                ${inRange ? "bg-blue-200" : ""}
                ${isStart ? "bg-blue-500 text-white rounded-full" : ""}
                ${isEnd ? "bg-blue-500 text-white rounded-full" : ""}
                ${isToday && !isStart && !isEnd ? "border border-blue-500" : ""}
              `}
            >
              {item.day}

              {/* Note Indicator */}
              {hasNote(item.date) && (
                <span className="absolute bottom-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}