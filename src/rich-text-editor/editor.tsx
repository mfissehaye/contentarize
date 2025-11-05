import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import FloatingMenu from "@tiptap/extension-floating-menu";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { createLowlight } from "lowlight";
import { RichTextEditorProps } from "./types";
import { Toolbar } from "./toolbar";
import "./styles.css";

// Create lowlight instance for code highlighting
const lowlight = createLowlight();

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter some rich text…",
  className = "",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable some extensions that we'll configure separately
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        codeBlock: false, // We'll use CodeBlockLowlight instead
        strike: false, // We'll add our own
        code: false, // We'll add our own
      }),
      // Text formatting
      Underline,
      Strike,
      Code,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      // Text alignment
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
      // Font styling
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FontSize,
      Superscript,
      Subscript,
      // Lists and tasks
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      // Code blocks
      CodeBlockLowlight.configure({
        lowlight,
      }),
      // Links and media
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      // Tables
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      // UI enhancements
      Placeholder.configure({
        placeholder: placeholder,
      }),
      CharacterCount,
      Dropcursor,
      Gapcursor,
      HardBreak,
      HorizontalRule,
      // Menus
      BubbleMenu,
      FloatingMenu,
      // Mentions
      Mention.configure({
        HTMLAttributes: {
          class: "bg-blue-100 text-blue-800 px-1 rounded",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 max-w-none ${className}`,
        spellCheck: "true",
      },
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="ctz-border ctz-border-gray-300 ctz-rounded-lg ctz-overflow-hidden ctz-bg-white">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="ctz-min-h-[200px] ctz-prose ctz-prose-sm ctz-sm:prose ctz-lg:prose-lg ctz-xl:prose-2xl ctz-max-w-none"
        placeholder={placeholder}
      />
      {editor.storage.characterCount && (
        <div className="ctz-px-3 ctz-py-2 ctz-text-xs ctz-text-gray-500 ctz-border-t ctz-border-gray-200 ctz-bg-gray-50">
          {editor.storage.characterCount.characters()} characters,{" "}
          {editor.storage.characterCount.words()} words
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
