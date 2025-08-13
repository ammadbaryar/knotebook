// src/pages/Home.jsx
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import NoteCard from '../components/NoteCard';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import db from '../database/db.js';
import "../styles/global.css"

export default function Home() {
  const notes = useDexieLiveQuery(() => db.notes.orderBy('createdAt').reverse().toArray(), []);

  return (
  <MainLayout>  
      <section>
        <h1>Recent Notes</h1>
        <div className="notes-grid">
          {notes?.length ? (
            notes.map((note) => <NoteCard key={note.id} note={note} />)
          ) : (
            <p>No notes yet. Click "New Note" in the sidebar to create one.</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
