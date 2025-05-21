"use client";

import { TBlog } from "@/types/blog.types";
import { format } from "date-fns";
import Link from "next/link";

export default function BlogSection({ blog }: { blog: TBlog[] }) {
  return (
    <section className="py-16 px-6 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 border-b-4 border-primary inline-block pb-2">
          Latest Blog Posts
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {blog.map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.id}
              className=" backdrop-blur-3xl rounded-lg overflow-hidden shadow-lg cursor-pointer select-none transform transition-all bg-gray-100 dark:bg-[#09090b] border  dark:text-gray-300 text-gray-900"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p className="dark:text-gray-200 text-sm">
                  {blog.description?.slice(0, 100)}
                </p>
                <div className="flex justify-between items-center text-xs text-primary pt-2">
                  <span>
                    {format(new Date(blog.createdAt), "dd MMMM yyyy")}
                  </span>
                  <span>5 min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
