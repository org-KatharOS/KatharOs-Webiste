import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';

const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative">
      <pre className="bg-black/50 text-green-400 p-4 rounded-md overflow-x-auto pr-12">
        <code className={language ? `language-${language}` : ''}>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-700/50 rounded"
        title="Copy code"
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      {copied && (
        <div className="absolute top-12 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg animate-fade-in">
          Code copied!
        </div>
      )}
    </div>
  );
};

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold text-white mb-4 font-playfair">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-white mb-4 mt-8">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-gray-300 leading-relaxed mb-6">
            {children}
          </p>
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : undefined;
          
          if (!inline && typeof children === 'string') {
            return <CodeBlock code={children} language={language} />;
          }
          
          return (
            <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm" {...props}>
              {children}
            </code>
          );
        },
        ul: ({ children }) => (
          <ul className="space-y-2 text-gray-300 mb-6">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="flex items-start">
            <span className="w-2 h-2 bg-[#9E4AF2] rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span>{children}</span>
          </li>
        ),
        blockquote: ({ children }) => (
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div className="text-blue-200">
                {children}
              </div>
            </div>
          </div>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-700 rounded-lg">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="bg-gray-800 text-white px-4 py-2 text-left border-b border-gray-700">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="text-gray-300 px-4 py-2 border-b border-gray-700">
            {children}
          </td>
        ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};