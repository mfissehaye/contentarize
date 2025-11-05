# TipTap Rich Text Editor

A comprehensive rich text editor built with TipTap for React, featuring HTML serialization/deserialization and a wide range of formatting options.

## Features

### Text Formatting
- **Bold**, *Italic*, <u>Underline</u>, ~~Strikethrough~~
- `Inline code` and code blocks with syntax highlighting
- Text highlighting with multiple colors
- Font family and size selection
- Superscript and subscript

### Headings
- H1, H2, H3, H4, H5, H6 support
- Proper semantic HTML output

### Lists
- Bullet lists
- Numbered lists
- Task lists with checkboxes

### Media & Links
- Link insertion and editing
- Image insertion with responsive sizing
- Table creation and editing

### Layout
- Text alignment (left, center, right, justify)
- Blockquotes
- Horizontal rules
- Code blocks with syntax highlighting

### Advanced Features
- Character count
- Placeholder text
- Keyboard shortcuts
- Bubble menu for quick formatting
- Floating menu for block insertion
- Drag and drop support
- History (undo/redo)

## Installation

The required dependencies are already installed:

```bash
pnpm add @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/html
pnpm add @tiptap/extension-underline @tiptap/extension-text-align
pnpm add @tiptap/extension-color @tiptap/extension-text-style
pnpm add @tiptap/extension-highlight @tiptap/extension-strike
pnpm add @tiptap/extension-code-block-lowlight @tiptap/extension-link
pnpm add @tiptap/extension-image @tiptap/extension-table
pnpm add @tiptap/extension-table-row @tiptap/extension-table-cell
pnpm add @tiptap/extension-table-header @tiptap/extension-task-list
pnpm add @tiptap/extension-task-item @tiptap/extension-mention
pnpm add @tiptap/extension-placeholder @tiptap/extension-character-count
pnpm add @tiptap/extension-font-family @tiptap/extension-font-size
pnpm add @tiptap/extension-superscript @tiptap/extension-subscript
pnpm add @tiptap/extension-dropcursor @tiptap/extension-gapcursor
pnpm add @tiptap/extension-history @tiptap/extension-bubble-menu
pnpm add @tiptap/extension-floating-menu @tiptap/extension-hard-break
pnpm add @tiptap/extension-horizontal-rule lowlight
```

## Usage

### Basic Usage

```tsx
import { RichTextEditor } from './components/rich-text-editor';

const MyComponent = () => {
  const [content, setContent] = useState([
    {
      type: "paragraph",
      children: [{ text: "Your initial content here" }]
    }
  ]);

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Start typing..."
    />
  );
};
```

### Advanced Usage

```tsx
import { RichTextEditor } from './components/rich-text-editor';

const MyComponent = () => {
  const [content, setContent] = useState([]);

  const handleSave = async () => {
    // Convert to HTML for storage
    const htmlContent = convertSlateToHtml(content);
    await saveToBackend(htmlContent);
  };

  const handleLoad = async () => {
    // Load HTML from backend and convert to Slate format
    const htmlContent = await loadFromBackend();
    const slateContent = convertHtmlToSlate(htmlContent);
    setContent(slateContent);
  };

  return (
    <div>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Enter your content..."
        className="custom-editor-class"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
    </div>
  );
};
```

### Using the Demo Component

```tsx
import { RichTextEditorDemo } from './components/rich-text-editor';

const App = () => {
  return <RichTextEditorDemo />;
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any[]` | `[]` | Slate format content array |
| `onChange` | `(value: any[]) => void` | - | Callback when content changes |
| `placeholder` | `string` | `"Enter some rich text…"` | Placeholder text |
| `className` | `string` | `""` | Additional CSS classes |

## Data Format

The editor uses Slate's `Descendant[]` format for compatibility with existing code, but internally converts to/from HTML for TipTap processing.

### Slate Format Example
```json
[
  {
    "type": "paragraph",
    "children": [
      { "text": "Hello " },
      { "text": "world", "bold": true }
    ]
  }
]
```

### HTML Output
```html
<p>Hello <strong>world</strong></p>
```

## Keyboard Shortcuts

- `Ctrl+B` - Bold
- `Ctrl+I` - Italic
- `Ctrl+U` - Underline
- `Ctrl+Shift+S` - Strikethrough
- `Ctrl+` - Inline code
- `Ctrl+Shift+8` - Bullet list
- `Ctrl+Shift+7` - Numbered list
- `Ctrl+Shift+>` - Blockquote
- `Ctrl+Shift+H` - Heading
- `Ctrl+K` - Add link
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo

## Styling

The editor includes comprehensive CSS styles in `styles.css`. You can customize the appearance by:

1. Modifying the CSS variables in `styles.css`
2. Adding custom classes via the `className` prop
3. Overriding styles with your own CSS

## Extensions

The editor includes many TipTap extensions:

- **StarterKit** - Basic functionality
- **Underline** - Underline text
- **TextAlign** - Text alignment
- **Color** - Text color
- **TextStyle** - Font styling
- **Highlight** - Text highlighting
- **Strike** - Strikethrough
- **CodeBlockLowlight** - Code blocks with syntax highlighting
- **Link** - Links
- **Image** - Images
- **Table** - Tables
- **TaskList** - Task lists
- **Mention** - @mentions
- **Placeholder** - Placeholder text
- **CharacterCount** - Character counting
- **FontFamily** - Font family selection
- **FontSize** - Font size selection
- **Superscript/Subscript** - Text positioning
- **Dropcursor** - Drag and drop cursor
- **Gapcursor** - Gap cursor
- **History** - Undo/redo
- **BubbleMenu** - Context menu
- **FloatingMenu** - Block insertion menu

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT