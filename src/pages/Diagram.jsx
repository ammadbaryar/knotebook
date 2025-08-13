// src/pages/Diagram.jsx
import React, { useState, useCallback } from 'react';
import MainLayout from '../layouts/MainLayout';
import useDexieLiveQuery from '../hooks/useDexieLiveQuery';
import db from '../database/db.js';
import NodeCanvas from '../components/NodeCanvas';

export default function Diagram() {
  const diagrams = useDexieLiveQuery(() => db.diagrams.orderBy('createdAt').reverse().toArray(), []);
  const [selected, setSelected] = useState(null);
  const [currentFlow, setCurrentFlow] = useState({ nodes: [], edges: [] });

  const handleSave = async () => {
    if (!currentFlow) return alert('Nothing to save');
    const now = new Date().toISOString();
    if (selected && selected.id) {
      await db.diagrams.update(selected.id, { data: currentFlow, updatedAt: now });
      alert('Updated diagram');
    } else {
      await db.diagrams.add({ title: `Diagram ${new Date().toLocaleString()}`, data: currentFlow, createdAt: now, updatedAt: now });
      alert('Saved diagram');
    }
  };

  // NodeCanvas should call setFlowData when nodes/edges change; implement that prop in your NodeCanvas component
  const setFlowData = useCallback((data) => {
    setCurrentFlow(data);
  }, []);

  const loadDiagram = (d) => {
    setSelected(d);
    setCurrentFlow(d.data || { nodes: [], edges: [] });
  };

  return (
    <MainLayout>
      <section>
        <h1>Diagram / Graph</h1>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1, height: 500, border: '1px solid #ddd' }}>
            <NodeCanvas nodes={currentFlow.nodes} edges={currentFlow.edges} setFlowData={setFlowData} />
          </div>

          <aside style={{ width: 320 }}>
            <button onClick={handleSave}>Save Diagram</button>
            <h3 style={{ marginTop: 12 }}>Saved diagrams</h3>
            {diagrams?.length ? diagrams.map(d => (
              <div key={d.id} style={{ padding: 8, cursor: 'pointer' }} onClick={() => loadDiagram(d)}>
                <strong>{d.title}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>{new Date(d.createdAt).toLocaleString()}</div>
              </div>
            )) : <div>No diagrams yet</div>}
          </aside>
        </div>
      </section>
    </MainLayout>
  );
}
