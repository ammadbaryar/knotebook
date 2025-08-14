// src/pages/Editor.jsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import db from '../database/db.js';
import CodeEditor from '../components/CodeEditor';
import { useParams } from 'react-router-dom';
import './Editor.css';

export default function Editor() {
  const { id } = useParams();
  const snippets = useDexieLiveQuery(() => db.snippets.orderBy('createdAt').reverse().toArray(), []);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// your code');
  const [notFound, setNotFound] = useState(false);

  // Load snippet by id from route params
  useEffect(() => {
    if (id) {
      db.snippets.get(Number(id)).then((s) => {
        if (s) {
          setSelected(s);
          setTitle(s.title);
          setLanguage(s.language || 'javascript');
          setCode(s.code || '');
          setNotFound(false);
        } else {
          setSelected(null);
          setTitle('');
          setLanguage('javascript');
          setCode('// your code');
          setNotFound(true);
        }
      });
    } else {
      setSelected(null);
      setTitle('');
      setLanguage('javascript');
      setCode('// your code');
      setNotFound(false);
    }
  }, [id]);

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
      const updated = await db.snippets.get(selected.id);
      setSelected(updated);
      setTitle(updated.title);
      setLanguage(updated.language || 'javascript');
      setCode(updated.code || '');
      alert('Updated snippet');
    } else {
      const newId = await db.snippets.add({ title, language, code, createdAt: now, updatedAt: now });
      const newSnippet = await db.snippets.get(newId);
      setSelected(newSnippet);
      setTitle(newSnippet.title);
      setLanguage(newSnippet.language || 'javascript');
      setCode(newSnippet.code || '');
      alert('Saved snippet');
    }
  };

  const handleDelete = async () => {
    if (!selected) return alert('Select a snippet first');
    await db.snippets.delete(selected.id);
    setSelected(null);
    setTitle('');
    setLanguage('javascript');
    setCode('// your code');
    setNotFound(false);
  };

  return (
    <MainLayout>
      <div className="editor-container">
        {/* <div style={{background: '#ffe', padding: '1rem', marginBottom: '1rem', border: '1px solid #ccc'}}>
          <div><strong>Debug Info:</strong></div>
          <div>Route param id: {id ? id : 'None'}</div>
          <div>Selected snippet: {selected ? JSON.stringify(selected) : 'None'}</div>
          <div>All snippet IDs: {snippets && snippets.length ? snippets.map(s => s.id).join(', ') : 'None'}</div>
        </div> */}
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
        {/* <div style={{marginBottom: '1rem'}}>
          <strong>Current ID:</strong> {id ? id : 'None'}
        </div> */}
        {id && (!selected || notFound) && (
          <div className="editor-notfound" style={{color: 'red', fontWeight: 'bold', marginBottom: '1rem'}}>Snippet not found for ID: {id}</div>
        )}
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
