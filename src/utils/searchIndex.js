// src/utils/searchIndex.js
import lunr from 'lunr';

/**
 * createSearchIndex(notes)
 * notes: [{ id, title, content }]
 * returns lunr index
 */
export function createSearchIndex(notes = []) {
  return lunr(function () {
    this.ref('id');
    this.field('title');
    this.field('content');

    notes.forEach((note) => {
      // Lunr prefers string refs
      this.add({
        id: String(note.id),
        title: note.title || '',
        content: note.content || ''
      });
    });
  });
}
