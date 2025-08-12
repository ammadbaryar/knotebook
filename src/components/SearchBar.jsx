import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="p-3 border-b bg-white flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="🔍 Search notes..."
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
