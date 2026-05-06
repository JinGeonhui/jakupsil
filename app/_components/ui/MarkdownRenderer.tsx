'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-primary-800 mt-6 mb-3 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-primary-800 mt-6 mb-2 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-primary-800 mt-4 mb-2">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold text-primary-700 mt-3 mb-1">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-sm text-primary-600 leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-sm text-primary-600 mb-3 space-y-1 ml-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-sm text-primary-600 mb-3 space-y-1 ml-1">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse border border-gray-200 rounded-md">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-primary-50">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border border-gray-200 px-3 py-2 text-left text-sm font-semibold text-primary-700">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-200 px-3 py-2 text-sm text-primary-600">
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-7 border-primary-900 bg-primary-50 pl-4 py-2 pr-3 rounded-sm text-sm text-primary-500 flex items-center min-h-[40px] [&>p]:mb-0">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <pre className="bg-primary-50 rounded-md p-4 mb-3 overflow-x-auto">
          <code className="text-xs font-mono text-primary-700">
            {children}
          </code>
        </pre>
      );
    }
    return (
      <code className="bg-gray-100 text-primary-700 px-1.5 py-0.5 rounded-xs text-xs font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  hr: () => <hr className="border-gray-200 my-4" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-accent-500 hover:text-accent-600 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  input: ({ checked, ...props }) => (
    <input
      type="checkbox"
      checked={checked}
      readOnly
      className="mr-2 accent-primary-900"
      {...props}
    />
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-primary-700">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => (
    <del className="line-through text-primary-400">{children}</del>
  ),
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
