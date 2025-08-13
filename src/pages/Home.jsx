import React from 'react';
import MainLayout from '../layouts/MainLayout';
import NoteCard from '../components/NoteCard';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import db from '../database/db.js';
import './Home.css';

export default function Home() {
  const notes = useDexieLiveQuery(() => db.notes.orderBy('createdAt').reverse().toArray(), []);
  const snippets = useDexieLiveQuery(() => db.snippets?.orderBy('createdAt').reverse().toArray(), []);

  return (
    <MainLayout>
      <div className="home-container">
        <h1 className="home-title">Welcome to Knotebook</h1>
        <p className="home-description">
          Your personal space for notes and code snippets. Start by creating a new note or snippet!
        </p>
        <div className="home-actions">
          <button className="home-action-btn">New Note</button>
          <button className="home-action-btn">New Snippet</button>
        </div>

        <section>
          <h2 className="home-title">Recent Notes</h2>
          <div className="notes-grid">
            {notes?.length ? (
              notes.map((note) => <NoteCard key={note.id} note={note} />)
            ) : (
              <p>No notes yet. Click "New Note" above to create one.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="home-title">Recent Snippets</h2>
          <div className="notes-grid">
            {snippets?.length ? (
              snippets.map((snippet) => (
                <NoteCard key={snippet.id} note={snippet} /> // You may want a separate SnippetCard component
              ))
            ) : (
              <p>No snippets yet. Click "New Snippet" above to create one.</p>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}