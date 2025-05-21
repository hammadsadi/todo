"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButtons } from "@/components/modules/BlogDetails/ShareOption/ShareButtons";
import rehypeRaw from "rehype-raw";
import { CopyButton } from "@/components/modules/Shared/CopyButton/CopyButton";
import { TBlog } from "@/types/blog.types"; // Assuming you have this type
import { getSingleBlogs } from "@/services/BlogServices";
import Image from "next/image";

const BlogDetailsPage: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await getSingleBlogs(params?.slug as string);
        setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params?.slug) {
      fetchBlog();
    }
  }, [params?.slug]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <Button size="sm" className="text-sm mb-2 text-white" asChild>
        <Link href="/blog">← Back to Blogs</Link>
      </Button>

      {/* Title */}
      {loading ? (
        <Skeleton className="h-10 w-3/4 rounded" />
      ) : (
        <h1 className="text-4xl font-bold leading-tight">{blog?.title}</h1>
      )}

      {/* Author & Date */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {loading ? (
          <>
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </>
        ) : (
          <>
            <Avatar className="w-8 h-8">
              <AvatarImage src={blog?.user?.image || "/author.jpg"} />
              <AvatarFallback>{blog?.user?.name?.[0] || "A"}</AvatarFallback>
            </Avatar>
            <span>{blog?.user?.name || "Anonymous"}</span>
            <span>• {format(new Date(blog?.createdAt!), "MMMM d, yyyy")}</span>
          </>
        )}
      </div>

      {/* Blog Image */}
      {loading ? (
        <Skeleton className="w-full aspect-video rounded-xl" />
      ) : blog?.image ? (
        <Image
          width={400}
          height={500}
          src={blog.image}
          alt={blog.title}
          className="w-full aspect-video object-cover rounded-xl"
        />
      ) : (
        <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
          <span>No image</span>
        </div>
      )}

      {/* Like and Share */}
      <div className="flex gap-4 items-center text-muted-foreground">
        <Button variant="ghost" size="icon" onClick={() => setLiked(!liked)}>
          <Heart
            className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
        {!loading && blog && (
          <ShareButtons title={blog.title} slug={blog.slug} />
        )}
      </div>

      {/* Tabs */}
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
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ) : (
            <div className="prose prose-invert max-w-none dark:prose-dark">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({
                    node,
                    inline,
                    className,
                    children,
                    ...props
                  }: {
                    node?: any;
                    inline?: boolean;
                    className?: string;
                    children?: React.ReactNode;
                    [key: string]: any;
                  }) {
                    if (inline) {
                      return (
                        <code
                          className="bg-muted px-1 py-0.5 rounded"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    const codeString = Array.isArray(children)
                      ? children.join("")
                      : String(children);

                    return (
                      <div className="w-full overflow-auto rounded-lg bg-muted p-4 my-4">
                        <CopyButton content={codeString}>
                          <code className={`${className} text-sm`} {...props}>
                            {codeString}
                          </code>
                        </CopyButton>
                      </div>
                    );
                  },
                }}
              >
                {blog?.description || "No content available."}
              </ReactMarkdown>
            </div>
          )}
        </TabsContent>

        <TabsContent value="comments" className="pt-6 space-y-6">
          <h2>Coming Soon</h2>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogDetailsPage;
