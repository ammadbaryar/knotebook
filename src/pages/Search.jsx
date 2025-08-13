// src/pages/Search.jsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import useSearch from '../hooks/useSearch';
import db from '../database/db.js';
import NoteCard from '../components/NoteCard';

export default function Search() {
  const notes = useDexieLiveQuery(() => db.notes.toArray(), []);
  const [q, setQ] = useState('');
  const results = useSearch(notes || [], q);

  return (
    <MainLayout>
      <section>
        <h1>Search</h1>
        <div style={{ marginBottom: 12 }}>
          <input placeholder="Search notes..." value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: 8, width: '60%' }} />
        </div>

        <div className="notes-grid">
          {q && results.length === 0 && <p>No results</p>}
          {results.map((r) => (
            <NoteCard key={r.id} note={r} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
