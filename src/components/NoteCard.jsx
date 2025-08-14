import React from "react";

const NoteCard = ({ note, onClick }) => {
  // Show note.content for notes, note.code for snippets
  const excerpt = note?.content || note?.code || "No content yet...";
  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-md cursor-pointer bg-white"
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg">{note?.title || "Untitled"}</h3>
      <p className="text-gray-600 text-sm mt-2">{excerpt.slice(0, 120)}</p>
    </div>
  );
};

export default NoteCard;
