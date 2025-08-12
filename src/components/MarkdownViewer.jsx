import React from "react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { unified } from "unified";

const MarkdownViewer = ({ content }) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement: React.createElement });

  const renderedContent = processor.processSync(content).result;

  return <div className="prose max-w-none p-4">{renderedContent}</div>;
};

export default MarkdownViewer;
