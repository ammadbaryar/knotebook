import React from "react";

const NoteCard = ({ title, excerpt, onClick }) => {
  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-md cursor-pointer bg-white"
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg">{title || "Untitled"}</h3>
      <p className="text-gray-600 text-sm mt-2">{excerpt || "No content yet..."}</p>
    </div>
  );
};

export default NoteCard;
