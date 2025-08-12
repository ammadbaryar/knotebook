import React from "react";

const Sidebar = ({ notes, onSelect }) => {
  return (
    <aside className="w-64 bg-gray-100 border-r overflow-y-auto">
      <h2 className="p-4 font-semibold text-lg border-b">📂 Notes</h2>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className="p-3 hover:bg-green-100 cursor-pointer"
            onClick={() => onSelect(note.id)}
          >
            {note.title || "Untitled"}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
