"use client";

import { useState } from "react";

export const CopyButton = ({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group bg-muted p-1 rounded-md">
      <button
        onClick={handleCopy}
        className="absolute top-1 right-1 text-xs bg-gray-800 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      {children}
    </div>
  );
};
