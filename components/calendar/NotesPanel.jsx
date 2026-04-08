"use client";

import { useState, useEffect } from "react";

export default function NotesPanel({
  startDate,
  endDate,
  notes,
  setNotes,
}) {
  const [noteText, setNoteText] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("calendarNotes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("calendarNotes", JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    if (!startDate || !endDate || !noteText) return;

    const newNote = {
      id: Date.now(),
      text: noteText,
      startDate,
      endDate,
    };

    setNotes([...notes, newNote]);
    setNoteText("");
  };

  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-2">Notes</h3>

      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write notes for selected date range..."
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
      />

      <button
        onClick={handleSave}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Save Note
      </button>

      {/*  Display Notes */}
      <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
        {notes.map((note) => (
          <div key={note.id} className="p-2 bg-gray-100 rounded-lg text-sm">
            <div className="text-gray-600">
              {new Date(note.startDate).toLocaleDateString()} -{" "}
              {new Date(note.endDate).toLocaleDateString()}
            </div>
            <div>{note.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}