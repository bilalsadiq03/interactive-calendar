"use client";

import { useState } from "react";

export default function CalendarGrid() {
  const [currentDate] = useState(new Date());

  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0–11

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  //  Get number of days in month
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  //  Get first day index (Mon = 0)
  const getStartDay = (y, m) => {
    const day = new Date(y, m, 1).getDay(); // 0 = Sun
    return (day + 6) % 7;
  };

  const daysInCurrentMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const calendarDays = [];

  // Previous month days
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      currentMonth: false,
      monthOffset: -1,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push({
      day: i,
      currentMonth: true,
      monthOffset: 0,
    });
  }

  // Next month days
  const remaining = 42 - calendarDays.length;

  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({
      day: i,
      currentMonth: false,
      monthOffset: 1,
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {calendarDays.map((item, index) => {
          //  Check if this is today
          const isToday =
            item.currentMonth &&
            item.day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={index}
              className={`p-2 aspect-square cursor-pointer flex items-center justify-center
                ${
                  item.currentMonth
                    ? "font-bold text-black hover:bg-blue-100"
                    : "text-gray-400"
                }
                ${isToday ? "bg-blue-400 text-white rounded-full hover:bg-blue-600" : ""}
              `}
            >
              {item.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}