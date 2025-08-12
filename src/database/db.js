// src/db.js
import Dexie from 'dexie';

const db = new Dexie('DevNotesDB');

// Define tables
db.version(1).stores({
  notes: '++id, title, content, createdAt', // for markdown notes
  codeSnippets: '++id, title, language, code, createdAt', // for code editor
  diagrams: '++id, title, data, createdAt' // for XYFlow diagrams
});

export default db;
