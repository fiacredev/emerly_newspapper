"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        protocols: ["http", "https", "mailto"],
      }),
      Image.configure({
        allowBase64: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[400px] p-5 outline-none focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="min-h-[400px] animate-pulse rounded-xl bg-slate-50" />
    );
  }

  const tools = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
        {tools.map(({ icon: Icon, action }, index) => (
          <button
            key={index}
            type="button"
            onClick={action}
            className="rounded-lg p-2 text-slate-600 hover:bg-white hover:text-blue-600"
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}