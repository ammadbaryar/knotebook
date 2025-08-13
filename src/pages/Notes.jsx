// src/pages/Notes.jsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import useMarkdown from '../hooks/useMarkdown';
import db from '../database/db.js';
import { useNavigate, useParams } from 'react-router-dom';

export default function Notes() {
  const notes = useDexieLiveQuery(() => db.notes.orderBy('createdAt').reverse().toArray(), []);
  const { id } = useParams(); // optional route /notes/:id or /notes/new
  const navigate = useNavigate();

  const [current, setCurrent] = useState({ title: '', content: '' });

  useEffect(() => {
    if (id && id !== 'new') {
      db.notes.get(Number(id)).then((n) => {
        if (n) setCurrent(n);
      });
    } else {
      setCurrent({ title: '', content: '# New note\n\nStart writing...' });
    }
  }, [id]);

  const html = useMarkdown(current.content || '');

  const save = async () => {
    const now = new Date().toISOString();
    if (current.id) {
      await db.notes.update(current.id, { ...current, updatedAt: now });
      alert('Note updated');
    } else {
      await db.notes.add({ ...current, createdAt: now, updatedAt: now });
      alert('Note saved');
    }
    navigate('/');
  };

  const remove = async () => {
    if (!current.id) return alert('Not saved yet');
    await db.notes.delete(current.id);
    navigate('/');
  };

  return (
    <MainLayout>
      <section>
        <h1>{current.id ? 'Edit Note' : 'New Note'}</h1>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <input value={current.title} onChange={(e) => setCurrent((s) => ({ ...s, title: e.target.value }))} placeholder="Title" style={{ padding: 8, width: '100%', marginBottom: 8 }} />
            <textarea value={current.content} onChange={(e) => setCurrent((s) => ({ ...s, content: e.target.value }))} style={{ width: '100%', height: 320, padding: 8 }} />
            <div style={{ marginTop: 8 }}>
              <button onClick={save}>Save</button>
              <button onClick={() => navigate('/')} style={{ marginLeft: 8 }}>Cancel</button>
              <button onClick={remove} style={{ marginLeft: 8 }}>Delete</button>
            </div>
          </div>

          <aside style={{ width: 420 }}>
            <h3>Preview</h3>
            <div className="markdown-viewer" dangerouslySetInnerHTML={{ __html: html }} />
          </aside>
        </div>
      </section>
    </MainLayout>
  );
}
