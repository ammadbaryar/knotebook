// src/pages/Diagram.jsx
import React, { useState, useEffect } from 'react';
import db from '../db';
import NodeCanvas from '../components/NodeCanvas';
import '../global.css';

export default function Diagram() {
  const [title, setTitle] = useState('');
  const [data, setData] = useState(null);
  const [diagrams, setDiagrams] = useState([]);

  // Load diagrams
  useEffect(() => {
    const fetchDiagrams = async () => {
      const allDiagrams = await db.diagrams.toArray();
      setDiagrams(allDiagrams.reverse());
    };
    fetchDiagrams();
  }, []);

  // Save diagram
  const saveDiagram = async () => {
    if (!title.trim() || !data) return alert('Please provide a title and diagram');
    await db.diagrams.add({ title, data, createdAt: new Date().toISOString() });
    setTitle('');
    setData(null);
    const updatedDiagrams = await db.diagrams.toArray();
    setDiagrams(updatedDiagrams.reverse());
  };

  return (
    <div className="page-container">
      <h1>Flow Diagrams</h1>
      <input
        type="text"
        placeholder="Diagram Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <NodeCanvas setData={setData} />
      <button onClick={saveDiagram}>Save Diagram</button>

      <div className="diagrams-list">
        {diagrams.map((d) => (
          <div key={d.id} className="diagram-item">
            <h2>{d.title}</h2>
            <pre>{JSON.stringify(d.data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
