"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlock from "@tiptap/extension-code-block"; // <-- code block extension
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Undo2, Redo2 } from "lucide-react";

type Props = {
  content: string;
  onChange: (content: string) => void;
};

export const TiptapEditor = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          exitOnTripleEnter: true,
        },
      }),
      CodeBlock,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 border rounded-md p-2">
        <Button
          type="button"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("codeBlock") ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={16} />
        </Button>
      </div>

      <div
        style={{
          height: "300px",
          border: "1px solid gray",
          borderRadius: "6px",
          padding: "12px",
        }}
      >
        <EditorContent
          editor={editor}
          style={{
            height: "100%",
            fontSize: "18px",
            lineHeight: "1.6",
            overflowY: "auto",
          }}
        />
      </div>
    </div>
  );
};
