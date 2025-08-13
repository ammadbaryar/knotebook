// src/pages/Notes.jsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import useMarkdown from '../hooks/useMarkdown';
import db from '../database/db.js';
import { useNavigate, useParams } from 'react-router-dom';
import './Notes.css';

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
    setCurrent({ title: '', content: '# New note\n\nStart writing...' });
  };

  const remove = async () => {
    if (!current.id) return alert('Not saved yet');
    await db.notes.delete(current.id);
    setCurrent({ title: '', content: '# New note\n\nStart writing...' });
  };

  return (
    <MainLayout>
      <div className="notes-container">
       <div className="notes-title-row">
          <h1 className="notes-title">{current.id ? 'Edit Note' : 'New Note'}</h1>
        </div>
        <div className="notes-main">
          <div className="notes-editor-wrapper">
            <input
              className="notes-input"
              value={current.title}
              onChange={(e) => setCurrent((s) => ({ ...s, title: e.target.value }))}
              placeholder="Title"
            />
            <textarea
              className="notes-textarea"
              value={current.content}
              onChange={(e) => setCurrent((s) => ({ ...s, content: e.target.value }))}
            />
          </div>
          <aside className="notes-aside">
            <div className="notes-toolbar">
              <button className="notes-btn" onClick={save}>Save</button>
              <button className="notes-btn" onClick={remove}>Delete</button>
            </div>
            <div className="notes-aside-header">
              <h3 className="notes-aside-title">Saved Notes</h3>
            </div>
            <div className="notes-list">
              {notes?.length ? notes.map((note) => (
                <div
                  key={note.id}
                  className={`notes-list-item${current.id === note.id ? ' selected' : ''}`}
                  onClick={async () => {
                    const n = await db.notes.get(note.id);
                    if (n) setCurrent(n);
                  }}
                >
                  <strong>{note.title || 'Untitled'}</strong>
                  <div className="notes-list-meta">{new Date(note.createdAt).toLocaleString()}</div>
                </div>
              )) : <div>No notes found</div>}
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
