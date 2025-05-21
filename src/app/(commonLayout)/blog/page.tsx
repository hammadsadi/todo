import { getAllBlogs } from "@/services/BlogServices";
import { TBlog } from "@/types/blog.types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const { data } = await getAllBlogs();

  if (!data || data.length === 0) {
    return (
      <section className="container max-w-6xl p-6 mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold">No blogs found</h2>
          <p className="text-muted-foreground">
            Check back later for new content
          </p>
        </div>
      </section>
    );
  }

  const featuredBlog: TBlog = data[0];
  const otherBlogs: TBlog[] = data.slice(1);

  return (
    <section className="">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        {/* Featured Blog */}
        {featuredBlog && (
          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 border rounded-md hover:shadow-md transition-shadow"
          >
            <div className="relative w-full h-64 sm:h-96 lg:col-span-7">
              <Image
                src={featuredBlog.image}
                alt={featuredBlog.title}
                fill
                className="object-cover rounded-l-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
              />
            </div>
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                {featuredBlog.title}
              </h3>
              <span className="text-xs text-muted-foreground">
                {format(new Date(featuredBlog.createdAt), "dd MMMM yyyy")}
              </span>
              <p className="text-gray-600 dark:text-gray-300">
                {featuredBlog.description?.slice(0, 200)}...
              </p>
              <span className="inline-block text-sm font-medium text-primary hover:underline">
                Read more →
              </span>
            </div>
          </Link>
        )}

        {/* Other Blogs Grid */}
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherBlogs.map((blog: TBlog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.id}
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline border rounded-md hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-44">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-t-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold group-hover:underline group-focus:underline">
                  {blog.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(blog.createdAt), "dd MMMM yyyy")}
                </span>
                <p className="text-gray-600 dark:text-gray-300">
                  {blog.description?.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
