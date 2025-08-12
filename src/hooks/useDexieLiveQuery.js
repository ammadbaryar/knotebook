// hooks/useDexieLiveQuery.js
import { liveQuery } from 'dexie';
import { useState, useEffect } from 'react';
import { db } from '../db';

export function useDexieLiveQuery(queryFn, deps = []) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscription = liveQuery(queryFn).subscribe({
      next: result => setData(result),
      error: err => console.error('Dexie live query error', err)
    });

    return () => subscription.unsubscribe();
  }, deps);

  return data;
}
