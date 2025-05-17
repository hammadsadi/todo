"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Copy,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import remarkGfm from "remark-gfm";

const sampleBlog = {
  title: "Tailwind CSS Tips and Tricks",
  createdAt: new Date("2023-06-22T10:00:00"),
  image: "/blog-placeholder.png",
  author: {
    name: "John Doe",
    avatar: "/author.jpg",
  },
  content: `## Customizing Your Theme

Tailwind makes it easy to customize your design system. You can extend or override the default theme in your \
tailwind.config.js file:

\`\`\`js
'72': '18rem',
'84': '21rem',
'96': '24rem',
\`\`\`

## Using @apply for Reusable Styles

If you find yourself repeating the same utility combinations, you can extract them into custom CSS classes using \`@apply\`:

\`\`\`css
&#64;layer components {
  .btn {
    &#64;apply px-4 py-2 bg-blue-500 text-white;
  }
}
\`\`\`

## Responsive Design

Tailwind makes responsive design easy with its mobile-first approach:

\`\`\`html
<div class="text-center md:text-left lg:text-right">
  <!-- Responsive alignment -->
</div>
\`\`\`

## Dark Mode

Tailwind v2.0 introduced built-in dark mode support:

\`\`\`js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
}
\`\`\`

Then use the \`dark:\` prefix in your markup:

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  <!-- Dark mode content -->
</div>
\`\`\`

## Conclusion

Tailwind CSS provides powerful tools to build efficient, custom designs.`,
  comments: [
    { id: 1, author: "Jane", text: "This was super useful, thanks!" },
    {
      id: 2,
      author: "Alex",
      text: "Nice explanation about @apply and dark mode.",
    },
  ],
};

export default function BlogDetailsPage() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [comments, setComments] = useState(sampleBlog.comments);
  const [commentInput, setCommentInput] = useState("");

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Blog link copied!");
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      author: "You",
      text: commentInput,
    };
    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <button className="text-sm text-muted-foreground mb-2">
        ← Back to Blogs
      </button>
      <h1 className="text-4xl font-bold leading-tight">{sampleBlog.title}</h1>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Avatar className="w-8 h-8">
          <AvatarImage src={sampleBlog.author.avatar} />
          <AvatarFallback>{sampleBlog.author.name[0]}</AvatarFallback>
        </Avatar>
        <span>{sampleBlog.author.name}</span>
        <span>• {format(sampleBlog.createdAt, "MMMM d, yyyy")}</span>
        <span>• 7 min read</span>
        <span>• 66 views</span>
      </div>

      <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
        <span>No image</span>
      </div>

      <div className="flex gap-4 items-center text-muted-foreground">
        <Button variant="ghost" size="icon" onClick={() => setLiked(!liked)}>
          <Heart
            className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleCopyLink}>
          <Copy className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setSaved(!saved)}>
          <Bookmark
            className={`w-5 h-5 ${saved ? "fill-blue-500 text-blue-500" : ""}`}
          />
        </Button>
      </div>

      <div className="border-b flex">
        <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary">
          Content
        </button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground">
          Comments
        </button>
      </div>

      <div className="prose prose-invert max-w-none dark:prose-dark">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ children }) {
              const codeStr = String(children).trim();
              return (
                <div className="relative my-4">
                  <pre className="bg-gray-900 text-white p-4 rounded-md overflow-auto">
                    <code>{codeStr}</code>
                  </pre>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 px-2 py-1"
                    variant="secondary"
                    onClick={() => handleCopyCode(codeStr)}
                  >
                    {copiedCode === codeStr ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-4 h-4" />
                        Copy
                      </span>
                    )}
                  </Button>
                </div>
              );
            },
          }}
        >
          {sampleBlog.content}
        </ReactMarkdown>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-input rounded-md px-3 py-2 text-sm"
            placeholder="Add your comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <Button onClick={handleAddComment}>Post</Button>
        </div>
        <div className="space-y-2">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-4 py-2 w-full">
                <p className="text-sm font-medium">{comment.author}</p>
                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
