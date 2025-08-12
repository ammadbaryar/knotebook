// utils/searchIndex.js
import lunr from 'lunr';

/**
 * Builds a Lunr search index
 * @param {Array} notes - Array of note objects [{id, title, content}]
 * @returns {lunr.Index}
 */
export function createSearchIndex(notes) {
  return lunr(function () {
    this.ref('id');
    this.field('title');
    this.field('content');

    notes.forEach(note => {
      this.add(note);
    });
  });
}
