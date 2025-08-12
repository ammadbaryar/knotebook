// hooks/useMarkdown.js
import { useState, useEffect } from 'react';
import { parseMarkdown } from '../utils/markdownParser';

export function useMarkdown(markdown) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    async function convert() {
      const parsed = await parseMarkdown(markdown || '');
      setHtml(parsed);
    }
    convert();
  }, [markdown]);

  return html;
}
