import React from "react";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  BoldIcon,
  CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  UnderlineIcon,
  Strikethrough,
  Highlighter,
  Link,
  Image,
  Table,
  CheckSquare,
  Minus,
  Type,
  Palette,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyEnd,
  Code2,
  List,
  Hash,
  Quote,
  Bold,
  Italic,
  Underline,
  Strikethrough as StrikeIcon,
  Highlighter as HighlightIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  CheckSquare as CheckIcon,
  Minus as MinusIcon,
  Type as TypeIcon,
  Palette as PaletteIcon,
} from "lucide-react";
import classNames from "classnames";
import { ToolbarButtonProps } from "./types";

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  disabled = false,
  children,
  title,
}) => (
  <button
    type="button"
    className={classNames(
      "p-2 rounded-md transition-colors",
      isActive
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300",
      disabled && "opacity-50 cursor-not-allowed"
    )}
    onClick={onClick}
    disabled={disabled}
    title={title}
  >
    {children}
  </button>
);

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="ctz-flex ctz-flex-wrap ctz-gap-2 ctz-p-3 ctz-border-b ctz-border-gray-200">
      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold (Ctrl+B)"
      >
        <BoldIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic (Ctrl+I)"
      >
        <ItalicIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline (Ctrl+U)"
      >
        <UnderlineIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <StrikeIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        title="Code (Ctrl+`)"
      >
        <CodeIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editor.isActive("highlight")}
        title="Highlight"
      >
        <HighlightIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <div className="ctz-w-px ctz-h-8 ctz-bg-gray-300 ctz-mx-1" />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        <Heading1 className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        <Heading3 className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        isActive={editor.isActive("heading", { level: 4 })}
        title="Heading 4"
      >
        <Heading4 className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        isActive={editor.isActive("heading", { level: 5 })}
        title="Heading 5"
      >
        <Heading5 className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        isActive={editor.isActive("heading", { level: 6 })}
        title="Heading 6"
      >
        <Heading6 className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <div className="ctz-w-px ctz-h-8 ctz-bg-gray-300 ctz-mx-1" />

      {/* Lists and blocks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <ListIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Numbered List"
      >
        <ListOrderedIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={editor.isActive("taskList")}
        title="Task List"
      >
        <CheckIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Blockquote"
      >
        <QuoteIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        isActive={false}
        title="Horizontal Rule"
      >
        <MinusIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <div className="ctz-w-px ctz-h-8 ctz-bg-gray-300 ctz-mx-1" />

      {/* Text alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        title="Align Left"
      >
        <AlignLeft className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        title="Align Center"
      >
        <AlignCenter className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        title="Align Right"
      >
        <AlignRight className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        isActive={editor.isActive({ textAlign: "justify" })}
        title="Justify"
      >
        <AlignJustify className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <div className="ctz-w-px ctz-h-8 ctz-bg-gray-300 ctz-mx-1" />

      {/* Media and links */}
      <ToolbarButton
        onClick={() => {
          const url = window.prompt("Enter URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        isActive={editor.isActive("link")}
        title="Add Link"
      >
        <LinkIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => {
          const url = window.prompt("Enter image URL:");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        isActive={false}
        title="Add Image"
      >
        <ImageIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        isActive={editor.isActive("table")}
        title="Insert Table"
      >
        <TableIcon className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      <div className="ctz-w-px ctz-h-8 ctz-bg-gray-300 ctz-mx-1" />

      {/* Code blocks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        title="Code Block"
      >
        <Code2 className="ctz-w-4 ctz-h-4" />
      </ToolbarButton>

      {/* Font styling */}
      <select
        className="ctz-px-2 ctz-py-1 ctz-border ctz-border-gray-300 ctz-rounded ctz-text-sm"
        onChange={(e) => {
          const fontFamily = e.target.value;
          if (fontFamily) {
            editor.chain().focus().setFontFamily(fontFamily).run();
          }
        }}
        title="Font Family"
      >
        <option value="">Font Family</option>
        <option value="Inter">Inter</option>
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
      </select>

      <input
        type="color"
        className="ctz-w-8 ctz-h-8 ctz-border ctz-border-gray-300 ctz-rounded ctz-cursor-pointer"
        onChange={(e) => {
          editor.chain().focus().setColor(e.target.value).run();
        }}
        title="Text Color"
      />

      <input
        type="color"
        className="ctz-w-8 ctz-h-8 ctz-border ctz-border-gray-300 ctz-rounded ctz-cursor-pointer"
        onChange={(e) => {
          editor.chain().focus().setHighlight({ color: e.target.value }).run();
        }}
        title="Highlight Color"
      />
    </div>
  );
};
