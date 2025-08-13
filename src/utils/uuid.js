// src/utils/uuid.js
export function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback:
  return 'xxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return r.toString(16);
  });
}
