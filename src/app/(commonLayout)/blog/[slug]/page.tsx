"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Heart, Check, MoreVertical } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShareButtons } from "@/components/modules/BlogDetails/ShareOption/ShareButtons";
import Link from "next/link";

type Comment = {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
};

const initialComments: Comment[] = [
  {
    id: 1,
    name: "John Doe",
    content: "This is an awesome blog post!",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    name: "Jane Smith",
    content: "I learned a lot, thanks for sharing.",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

const sampleBlog = {
  title: "Tailwind CSS Tips and Tricks",
  createdAt: new Date("2023-06-22T10:00:00"),
  image: "/blog-placeholder.png",
  author: {
    name: "John Doe",
    avatar: "/author.jpg",
  },
  content: `## Customizing Your Theme

Tailwind makes it easy to customize your design system. You can extend or override the default theme in your 
tailwind.config.js file:

\`\`\`js
'72': '18rem',
'84': '21rem',
'96': '24rem',
\`\`\`

## Using @apply for Reusable Styles

If you find yourself repeating the same utility combinations, you can extract them into custom CSS classes using \`@apply\`:

\`\`\`css
@layer components {
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white;
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
};

export default function BlogDetailsPage() {
  const [liked, setLiked] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentInput, setCommentInput] = useState("");

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  // const handleCopyLink = () => {
  //   navigator.clipboard.writeText(window.location.href);
  //   toast.success("Blog link copied!");
  // };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      name: "You",
      content: commentInput,
      createdAt: new Date(),
    };
    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <Button size="sm" className="text-sm  mb-2 cursor-pointer text-white">
        <Link href="/blog">← Back to Blogs</Link>
      </Button>
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

        <ShareButtons title={sampleBlog.title} slug={sampleBlog.title} />
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full bg-muted p-1 rounded-lg justify-start">
          <TabsTrigger
            value="content"
            className="data-[state=active]:!bg-[#09090b] data-[state=active]:!text-white flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="data-[state=active]:!bg-[#09090b] data-[state=active]:!text-white flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all"
          >
            Comments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="pt-6">
          <div className="prose prose-invert max-w-none dark:prose-dark">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre: (props) => {
                  const child = props.children as React.ReactElement<{
                    children: string;
                  }>;
                  const codeStr = (child?.props?.children || "").trim();

                  return (
                    <div className="relative my-4">
                      <pre
                        {...props}
                        className="bg-gray-900 text-white p-4 rounded-md overflow-auto"
                      >
                        {props.children}
                      </pre>
                      <Button
                        size="sm"
                        className="absolute top-2 right-2 px-2 py-1"
                        variant="secondary"
                        onClick={() => handleCopyCode(codeStr)}
                      >
                        {copiedCode === codeStr ? (
                          <span className="flex items-center gap-1">
                            <Check className="w-4 h-4" /> Copied
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Copy className="w-4 h-4" /> Copy
                          </span>
                        )}
                      </Button>
                    </div>
                  );
                },
                code: ({
                  inline,
                  className,
                  children,
                  ...props
                }: {
                  inline?: boolean;
                  className?: string;
                  children?: React.ReactNode;
                }) => {
                  const codeStr = String(children).trim();

                  if (inline) {
                    return (
                      <code className="bg-muted px-1 py-0.5 rounded" {...props}>
                        {codeStr}
                      </code>
                    );
                  }

                  return (
                    <code className={className} {...props}>
                      {codeStr}
                    </code>
                  );
                },
              }}
            >
              {sampleBlog.content}
            </ReactMarkdown>
          </div>
        </TabsContent>

        <TabsContent value="comments" className="pt-6 space-y-6">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start justify-between bg-muted/40 p-4 rounded-lg"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{comment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {comment.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <Input
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <Button onClick={handleAddComment}>Post</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
