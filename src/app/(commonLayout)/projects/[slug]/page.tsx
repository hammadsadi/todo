"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Heart, Check } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ShareButtons } from "@/components/modules/BlogDetails/ShareOption/ShareButtons";
import Link from "next/link";

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
const ProjectDetailsPage = () => {
  const [liked, setLiked] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <Button size="sm" className="text-sm  mb-2 cursor-pointer text-white">
        <Link href="/projects">← Back to Projects</Link>
      </Button>
      <h1 className="text-4xl font-bold leading-tight">{sampleBlog.title}</h1>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Avatar className="w-8 h-8">
          <AvatarImage src={sampleBlog.author.avatar} />
          <AvatarFallback>{sampleBlog.author.name[0]}</AvatarFallback>
        </Avatar>
        <span>{sampleBlog.author.name}</span>
        <span>• {format(sampleBlog.createdAt, "MMMM d, yyyy")}</span>
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
            Details
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="data-[state=active]:!bg-[#09090b] data-[state=active]:!text-white flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all"
          >
            Slides
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
          <h2>Coming Soon</h2>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailsPage;
