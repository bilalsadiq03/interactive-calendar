"use client";

import HeroImage from "./HeroImage";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";

export default function CalendarLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full">

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2">
          <HeroImage />

          <div className="p-6 flex flex-col gap-4">
            <CalendarGrid />
            <NotesPanel />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col">
          <HeroImage />

          <div className="p-4 flex flex-col gap-4">
            <CalendarGrid />
            <NotesPanel />
          </div>
        </div>

      </div>
    </div>
  );
}