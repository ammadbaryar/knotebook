// src/pages/Editor.jsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import db from '../database/db.js';
import CodeEditor from '../components/CodeEditor';
import './Editor.css';

export default function Editor() {
  const snippets = useDexieLiveQuery(() => db.snippets.orderBy('createdAt').reverse().toArray(), []);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// your code');

  const selectSnippet = (s) => {
    setSelected(s);
    setTitle(s.title);
    setLanguage(s.language || 'javascript');
    setCode(s.code || '');
  };

  const handleSave = async () => {
    const now = new Date().toISOString();
    if (selected && selected.id) {
      await db.snippets.update(selected.id, { title, language, code, updatedAt: now });
      alert('Updated snippet');
    } else {
      await db.snippets.add({ title, language, code, createdAt: now, updatedAt: now });
      alert('Saved snippet');
    }
    setSelected(null);
    setTitle('');
    setCode('');
  };

  const handleDelete = async () => {
    if (!selected) return alert('Select a snippet first');
    await db.snippets.delete(selected.id);
    setSelected(null);
    setTitle('');
    setCode('');
  };

  return (
    <MainLayout>
      <div className="editor-container">
        <h1 className="editor-title">Snippets Editor</h1>
        <div className="editor-toolbar">
          <input
            className="editor-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <select
            className="editor-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
          </select>
          <button className="editor-btn" onClick={handleSave}>Save</button>
          <button className="editor-btn" onClick={handleDelete}>Delete</button>
        </div>
        <div className="editor-main">
          <div className="editor-code-wrapper">
            <div className="editor-area editor-code-scroll">
              <CodeEditor value={code} onChange={setCode} />
            </div>
          </div>
          <aside className="editor-aside">
            <h3 className="editor-aside-title">Saved snippets</h3>
            <div className="editor-snippet-list">
              {snippets?.length ? snippets.map((s) => (
                <div
                  key={s.id}
                  className="editor-snippet-item"
                  onClick={() => selectSnippet(s)}
                >
                  <strong>{s.title}</strong>
                  <div className="editor-snippet-meta">{s.language} • {new Date(s.createdAt).toLocaleString()}</div>
                </div>
              )) : <div>No saved snippets</div>}
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
