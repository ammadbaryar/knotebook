// src/pages/Editor.jsx
import React, { useState, useEffect } from 'react';
import db from '../db';
import CodeEditor from '../components/CodeEditor';
import '../global.css';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [snippets, setSnippets] = useState([]);

  // Load snippets
  useEffect(() => {
    const fetchSnippets = async () => {
      const allSnippets = await db.codeSnippets.toArray();
      setSnippets(allSnippets.reverse());
    };
    fetchSnippets();
  }, []);

  // Save snippet
  const saveSnippet = async () => {
    if (!title.trim() || !code.trim()) return alert('Please fill in all fields');
    await db.codeSnippets.add({ title, language, code, createdAt: new Date().toISOString() });
    setTitle('');
    setCode('');
    const updatedSnippets = await db.codeSnippets.toArray();
    setSnippets(updatedSnippets.reverse());
  };

  return (
    <div className="page-container">
      <h1>Code Snippets</h1>
      <input
        type="text"
        placeholder="Snippet Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>
      <CodeEditor code={code} setCode={setCode} />
      <button onClick={saveSnippet}>Save Snippet</button>

      <div className="snippets-list">
        {snippets.map((s) => (
          <div key={s.id} className="snippet-item">
            <h2>{s.title} ({s.language})</h2>
            <pre>{s.code}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
