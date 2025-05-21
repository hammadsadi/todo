"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Create Blog
export const createBlog = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("sadi_portfolio_token")
            ?.value as string,
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag("BLOG");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get Blogs
export const getAllBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("sadi_portfolio_token")
          ?.value as string,
      },
      next: {
        tags: ["BLOG"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get Single Blog
export const getSingleBlogs = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("sadi_portfolio_token")
            ?.value as string,
        },
        next: {
          tags: ["BLOG"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
