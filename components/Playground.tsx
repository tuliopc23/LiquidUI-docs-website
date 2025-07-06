import React, { useState } from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { useTheme } from 'next-themes'
import * as LiquidifyComponents from 'liquidify'

interface PlaygroundProps {
  code: string
  scope?: Record<string, unknown>
  language?: string
}

export const Playground: React.FC<PlaygroundProps> = ({ 
  code, 
  scope = {}, 
  language = 'tsx' 
}) => {
  const { theme } = useTheme()
  const [editorCode, setEditorCode] = useState(code.trim())
  
  return (
    <LiveProvider
      code={editorCode}
      scope={{ ...React, ...LiquidifyComponents, ...scope }}
      language={language}
      theme={theme === 'dark' ? 'dracula' : 'github'}
    >
      <div className="playground-container">
        <div className="preview-container glass-card p-4 mb-4">
          <LivePreview />
          <LiveError />
        </div>
        <div className="editor-container">
          <LiveEditor onChange={setEditorCode} />
        </div>
        <div className="props-table mt-4">
          <h3 className="text-lg font-medium mb-2">Component Props</h3>
          {/* Dynamic props table based on component */}
        </div>
      </div>
    </LiveProvider>
  )
}

export default Playground