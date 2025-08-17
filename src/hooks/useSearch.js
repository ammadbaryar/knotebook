import { useState, useEffect, useMemo } from 'react';
import { createSearchIndex } from '../utils/searchIndex';

export default function useSearch(notes = [], query = '') {
  const [results, setResults] = useState([]);

  const index = useMemo(() => {
    try {
      if (!notes || notes.length === 0) return null;
      return createSearchIndex(notes);
    } catch (e) {
      console.warn('Failed to build lunr index', e);
      return null;
    }
  }, [notes]);

  useEffect(() => {
    if (!query || query.trim() === '') {
      setResults([]);
      return;
    }

    if (index) {
      try {
        // prefix search to help partial matches
        const hits = index.search(`${query}*`);
        const found = hits
          .map((h) => notes.find((n) => String(n.id) === String(h.ref)))
          .filter(Boolean);
        setResults(found);
        return;
      } catch (e) {
        console.warn('lunr search failed, falling back', e);
      }
    }

    // fallback simple substring filter
    const q = query.toLowerCase();
    const fallback = notes.filter((n) => {
      return (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q);
    });
    setResults(fallback);
  }, [query, index, notes]);

  return results;
}
