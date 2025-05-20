"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export const TagsInput = ({ value, onChange, placeholder }: TagsInputProps) => {
  const [input, setInput] = useState("");

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
        setInput("");
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  return (
    <div className="border rounded-md p-2 flex flex-wrap gap-2 min-h-[44px] ">
      {value.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-muted rounded px-2 py-1 text-sm"
        >
          {tag}
          <button
            type="button"
            className="ml-1"
            onClick={() => removeTag(index)}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <Input
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
        onKeyDown={addTag}
        className="flex-1 border-none shadow-none  "
        placeholder={placeholder || "Type and press Enter"}
      />
    </div>
  );
};
