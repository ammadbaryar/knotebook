// src/pages/Editor.jsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import db from '../database/db.js';
import CodeEditor from '../components/CodeEditor';

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
    // reset
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
      <section>
        <h1>Snippets</h1>

        <div style={{ marginBottom: 12 }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ padding: 8, width: '40%', marginRight: 8 }} />
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: 8 }}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
          </select>
          <button onClick={handleSave} style={{ marginLeft: 10 }}>Save</button>
          <button onClick={handleDelete} style={{ marginLeft: 8 }}>Delete</button>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ border: '1px solid #ddd', borderRadius: 6, overflow: 'hidden' }}>
              <CodeEditor value={code} onChange={setCode} />
            </div>
          </div>

          <aside style={{ width: 280 }}>
            <h3>Saved snippets</h3>
            {snippets?.length ? snippets.map((s) => (
              <div key={s.id} style={{ padding: 8, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => selectSnippet(s)}>
                <strong>{s.title}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>{s.language} • {new Date(s.createdAt).toLocaleString()}</div>
              </div>
            )) : <div>No saved snippets</div>}
          </aside>
        </div>
      </section>
    </MainLayout>
  );
}
