
import React from 'react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="bg-black/70 rounded-md p-4 border border-gray-700 shadow-inner">
      <pre><code className="text-sm md:text-base text-green-400 whitespace-pre-wrap break-words">
        {code}
      </code></pre>
    </div>
  );
};

export default CodeBlock;
