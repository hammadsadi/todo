"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getSingleProjects } from "@/services/Project";
import { TProject } from "@/types/project.types";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButtons } from "@/components/modules/BlogDetails/ShareOption/ShareButtons";
import rehypeRaw from "rehype-raw";
import { CopyButton } from "@/components/modules/Shared/CopyButton/CopyButton";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const ProjectDetailsPage: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [project, setProject] = useState<TProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const params = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const { data } = await getSingleProjects(params?.slug as string);
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params?.slug) {
      fetchProject();
    }
  }, [params?.slug]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <Button size="sm" className="text-sm mb-2 text-white" asChild>
        <Link href="/projects">← Back to Projects</Link>
      </Button>

      {/* Title */}
      {loading ? (
        <Skeleton className="h-10 w-3/4 rounded" />
      ) : (
        <h1 className="text-4xl font-bold leading-tight">{project?.title}</h1>
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
              <AvatarImage src="/author.jpg" />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <span>Hammad Sadi</span>
            <span>
              • {format(new Date(project?.createdAt!), "MMMM d, yyyy")}
            </span>
          </>
        )}
      </div>

      {/* Project Image */}
      {loading ? (
        <Skeleton className="w-full aspect-video rounded-xl" />
      ) : (
        <img
          src={project?.image?.[0]}
          alt={project?.title}
          className="w-full aspect-video object-cover rounded-xl"
        />
      )}

      {/* Like and Share */}
      <div className="flex gap-4 items-center text-muted-foreground">
        <Button variant="ghost" size="icon" onClick={() => setLiked(!liked)}>
          <Heart
            className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
        {!loading && project && (
          <ShareButtons title={project.title} slug={project.slug} />
        )}
      </div>

      {/* Tabs */}
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
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ) : (
            <div className="prose prose-invert max-w-none dark:prose-dark">
              <h2>Description</h2>
              <p>{project?.description}</p>

              <h2>Features</h2>
              <ul>
                {project?.features?.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <h2>Installation</h2>
              {/* <ReactMarkdown
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
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                    const codeString = Array.isArray(children)
                      ? children.join("")
                      : String(children);
                    return (
                      <CopyButton content={codeString}>
                        <code className={className} {...props}>
                          {codeString}
                        </code>
                      </CopyButton>
                    );
                  },
                }}
              >
                {project?.installation ??
                  "No installation instructions provided."}
              </ReactMarkdown> */}

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
                {project?.installation ??
                  "No installation instructions provided."}
              </ReactMarkdown>
            </div>
          )}
        </TabsContent>

        <TabsContent value="comments" className="pt-6 space-y-6">
          <div className="relative">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {project?.image?.map((item, idx) => (
                  <CarouselItem
                    key={idx}
                    className="basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Image
                        width={1000}
                        height={1000}
                        src={item}
                        alt={`Project slide ${idx + 1}`}
                        className="rounded-lg object-cover aspect-video"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Desktop arrows */}
              <div className="hidden md:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 hover:bg-background"
                  onClick={() => api?.scrollPrev()}
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 hover:bg-background"
                  onClick={() => api?.scrollNext()}
                >
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </div>
            </Carousel>

            {/* Mobile navigation */}
            <div className="flex justify-center items-center gap-4 mt-4 md:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() => api?.scrollPrev()}
                disabled={current === 0}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {current + 1} / {count}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => api?.scrollNext()}
                disabled={current === count - 1}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailsPage;
