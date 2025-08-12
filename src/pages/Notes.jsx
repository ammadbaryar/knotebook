// src/pages/Notes.jsx
import React, { useState, useEffect } from 'react';
import db from '../db';
import MarkdownViewer from '../components/MarkdownViewer';
import '../global.css';

export default function Notes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  // Load notes from DB
  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await db.notes.toArray();
      setNotes(allNotes.reverse());
    };
    fetchNotes();
  }, []);

  // Save note
  const saveNote = async () => {
    if (!title.trim() || !content.trim()) return alert('Please fill in both fields');
    await db.notes.add({ title, content, createdAt: new Date().toISOString() });
    setTitle('');
    setContent('');
    const updatedNotes = await db.notes.toArray();
    setNotes(updatedNotes.reverse());
  };

  return (
    <div className="page-container">
      <h1>Markdown Notes</h1>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write in markdown..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={saveNote}>Save Note</button>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <h2>{note.title}</h2>
            <MarkdownViewer content={note.content} />
          </div>
        ))}
      </div>
    </div>
  );
}
