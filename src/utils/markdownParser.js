// src/utils/markdownParser.js
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

/**
 * parseMarkdown(markdownString) -> Promise<string HTML>
 */
export async function parseMarkdown(markdown = '') {
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(markdown || '');
  return String(processed);
}
