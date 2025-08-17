import Dexie from 'dexie';

const db = new Dexie('digital_garden_db');

db.version(1).stores({
  notes: '++id, title, content, createdAt, updatedAt',
  diagrams: '++id, title, data, createdAt, updatedAt',
  snippets: '++id, title, code, language, createdAt, updatedAt',
});

export default db;
