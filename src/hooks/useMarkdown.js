// src/hooks/useMarkdown.js
import { useState, useEffect } from 'react';
import { parseMarkdown } from '../utils/markdownParser';

export default function useMarkdown(markdown) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const parsed = await parseMarkdown(markdown || '');
        if (!cancelled) setHtml(parsed);
      } catch (e) {
        console.error('parseMarkdown error', e);
        if (!cancelled) setHtml('');
      }
    })();
    return () => (cancelled = true);
  }, [markdown]);

  return html;
}
