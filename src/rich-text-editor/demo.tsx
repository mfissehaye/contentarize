import React, { useState } from 'react';
import { RichTextEditor } from './index';

const RichTextEditorDemo: React.FC = () => {
  const [content, setContent] = useState<string>('<p>Welcome to the new <strong>TipTap</strong> rich text editor! This editor supports <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s> text formatting.</p><h1>Features</h1><ul><li>Rich text formatting</li><li>Multiple heading levels</li><li>Lists and task lists</li><li>Tables and media</li></ul><blockquote>This is a blockquote example.</blockquote>');

  const handleSave = () => {
    console.log('Saving content:', content);
    // Here you would typically save to your backend
  };

  const handleLoad = () => {
    // Example of loading content
    const loadedContent = '<p>Loaded content from backend!</p>';
    setContent(loadedContent);
  };

  return (
    <div className="ctz:max-w-4xl ctz:mx-auto p-6">
      <h1 className="ctz:text-3xl font-bold ctz:mb-6">TipTap Rich Text Editor Demo</h1>
      
      <div className="mb-6">
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Start typing your content here..."
        />
      </div>

      <div className="ctz:flex ctz:gap-4 mb-6">
        <button
          onClick={handleSave}
          className="ctz:px-4 py-2 ctz:bg-blue-500 text-white rounded ctz:hover:bg-blue-600"
        >
          Save Content
        </button>
        <button
          onClick={handleLoad}
          className="ctz:px-4 py-2 ctz:bg-green-500 text-white rounded ctz:hover:bg-green-600"
        >
          Load Content
        </button>
      </div>

      <div className="bg-gray-100 ctz:p-4 rounded">
        <h3 className="ctz:font-semibold ctz:mb-2">Current Content (HTML Format):</h3>
        <pre className="text-sm ctz:overflow-auto">
          {content}
        </pre>
      </div>
    </div>
  );
};

export default RichTextEditorDemo;