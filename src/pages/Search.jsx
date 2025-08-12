import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import { db } from "../db";
import "./global.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (term) => {
    setQuery(term);
    if (term.trim() === "") {
      setResults([]);
      return;
    }
    const matches = await db.notes
      .filter(
        (note) =>
          note.title.toLowerCase().includes(term.toLowerCase()) ||
          note.content.toLowerCase().includes(term.toLowerCase())
      )
      .toArray();
    setResults(matches);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <h1>Search Notes</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="notes-grid">
            {results.length ? (
              results.map((note) => (
                <NoteCard
                  key={note.id}
                  title={note.title}
                  content={note.content}
                  date={note.date}
                />
              ))
            ) : (
              query && <p>No results found for "{query}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
