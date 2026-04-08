"use client";
import { useState } from "react";

export default function NotesPanel() {
  const [note, setNote] = useState("");

  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-2">Notes</h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes..."
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
      />

      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Save
      </button>
    </div>
  );
}