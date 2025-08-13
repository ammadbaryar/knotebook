import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import db from '../database/db.js';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  // Live queries for notes, diagrams, snippets
  const notes = useDexieLiveQuery(() => db.notes.orderBy('createdAt').reverse().toArray(), []);
  const diagrams = useDexieLiveQuery(() => db.diagrams.orderBy('createdAt').reverse().toArray(), []);
  const snippets = useDexieLiveQuery(() => db.snippets.orderBy('createdAt').reverse().toArray(), []);

  return (
    <div className="sidebar" >
      {/* Notes Section */}
      <div className="sidebar-section">
        <h3>Notes</h3>
        <button className="sidebar-btn" onClick={() => navigate('/notes')}>+ New Note</button>
        <div className="sidebar-list">
          {notes?.length ? (
            notes.map((n) => (
              <div
                key={n.id}
                className="sidebar-item"
                onClick={() => navigate(`/notes/${n.id}`)}
              >
                {n.title || 'Untitled'}
              </div>
            ))
          ) : (
            <div className="sidebar-empty">No notes</div>
          )}
        </div>
      </div>

      {/* Snippets Section */}
      <div className="sidebar-section">
        <h3>Snippets</h3>
        <button className="sidebar-btn" onClick={() => navigate('/editor')}>+ New Snippet</button>
        <div className="sidebar-list">
          {snippets?.length ? (
            snippets.map((s) => (
              <div
                key={s.id}
                className="sidebar-item"
                onClick={() => navigate(`/editor/${s.id}`)}
              >
                {s.title || 'Untitled Snippet'}
              </div>
            ))
          ) : (
            <div className="sidebar-empty">No snippets</div>
          )}
        </div>
      </div>
    </div>
  );
}
