// utils/markdownParser.js
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

/**
 * Parses Markdown text to HTML
 * @param {string} markdown
 * @returns {Promise<string>}
 */
export async function parseMarkdown(markdown) {
  const file = await remark()
    .use(remarkGfm) // GitHub-flavored markdown
    .use(remarkHtml)
    .process(markdown);

  return String(file);
}
