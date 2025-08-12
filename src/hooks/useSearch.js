// hooks/useSearch.js
import { useState, useEffect } from 'react';
import { createSearchIndex } from '../utils/searchIndex';

export function useSearch(notes, query) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const index = createSearchIndex(notes);
    const searchResults = index.search(query).map(r => {
      return notes.find(note => note.id === r.ref);
    });

    setResults(searchResults);
  }, [notes, query]);

  return results;
}
