import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import NoteCard from '../components/NoteCard';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import db from '../database/db.js';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const notes = useDexieLiveQuery(() => db.notes.orderBy('createdAt').reverse().toArray(), []);
  const snippets = useDexieLiveQuery(() => db.snippets?.orderBy('createdAt').reverse().toArray(), []);
  const [search, setSearch] = useState('');

  // Filter notes and snippets by search
  const filteredNotes = search
    ? notes.filter(n => (n.title || '').toLowerCase().includes(search.toLowerCase()) || (n.content || '').toLowerCase().includes(search.toLowerCase()))
    : [];
  const filteredSnippets = search
    ? snippets.filter(s => (s.title || '').toLowerCase().includes(search.toLowerCase()) || (s.code || '').toLowerCase().includes(search.toLowerCase()))
    : [];
  const results = search ? [...filteredNotes, ...filteredSnippets] : [];

  return (
    <MainLayout>
      <div className="home-container">
        <h1 className="home-title">Welcome to Knotebook</h1>
        <p className="home-description">
          Your personal space for notes and code snippets!
        </p>
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search notes and snippets..."
            style={{ padding: 8, width: '60%', borderRadius: 6, border: '1px solid #e0e0e0' }}
          />
        </div>

        {search ? (
          <section>
            <h2 className="home-title">Search Results</h2>
            <div className="notes-grid">
              {results.length === 0 && <p>No results found.</p>}
              {results.map((item) => (
                <NoteCard
                  key={item.id}
                  note={item}
                  onClick={() => {
                    if (item.content !== undefined) {
                      navigate(`/notes/${item.id}`);
                    } else if (item.code !== undefined) {
                      navigate(`/editor/${item.id}`);
                    }
                  }}
                />
              ))}
            </div>
          </section>

        ) : null}
      </div>
    </MainLayout>
  );
}