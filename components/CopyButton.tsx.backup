import React, { useState } from 'react'
import { ClipboardIcon, ClipboardCheckIcon } from '@heroicons/react/outline'

interface CopyButtonProps {
  text: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      className="copy-button absolute top-2 right-2 p-2 rounded-md glass-button opacity-70 hover:opacity-100 transition-opacity"
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {copied ? (
        <ClipboardCheckIcon className="w-5 h-5 text-green-500" />
      ) : (
        <ClipboardIcon className="w-5 h-5" />
      )}
    </button>
  )
}

export default CopyButton