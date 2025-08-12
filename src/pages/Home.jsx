import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NoteCard from "../components/NoteCard";
import { db } from "../database/db.js";
import { useLiveQuery } from "dexie-react-hooks";
import "../styles/global.css";

export default function Home() {
  const notes = useLiveQuery(() => db.notes.toArray(), []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <h1>All Notes</h1>
          <div className="notes-grid">
            {notes?.length ? (
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  title={note.title}
                  content={note.content}
                  date={note.date}
                />
              ))
            ) : (
              <p>No notes available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
