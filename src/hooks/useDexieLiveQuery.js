import { useState, useEffect } from 'react';
import { liveQuery } from 'dexie';

export default function useDexieLiveQuery(queryFn, deps = []) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sub = liveQuery(queryFn).subscribe({
      next: (result) => setData(result),
      error: (err) => {
        console.error('Dexie liveQuery error', err);
        setData([]);
      },
    });

    return () => sub.unsubscribe();
    
  }, deps);

  return data;
}
