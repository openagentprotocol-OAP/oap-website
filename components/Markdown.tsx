'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export function Markdown({ source }: { source: string }) {
  return (
    <article className="prose-oap">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, [rehypeKatex, { strict: false, throwOnError: false, output: 'html' }]]}
      >
        {source}
      </ReactMarkdown>
    </article>
  );
}
