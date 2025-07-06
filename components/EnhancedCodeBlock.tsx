import React, { useState } from 'react';
import { GlassComponent } from './GlassComponentBase';

export function EnhancedCodeBlock({ 
  code, 
  language = 'tsx', 
  showLineNumbers = true,
  title
}) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <GlassComponent 
      intensity="subtle" 
      className="my-6 overflow-hidden"
    >
      {title && (
        <div className="px-4 py-2 border-b border-border flex justify-between items-center">
          <span className="text-sm font-medium">{title}</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
          </div>
        </div>
      )}
      
      <div className="relative">
        <pre className={`language-${language} p-4 overflow-x-auto`}>
          <code>{code}</code>
        </pre>
        
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-md bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </GlassComponent>
  );
}

function CheckIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function CopyIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
}