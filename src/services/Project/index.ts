"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Create Project
export const createProject = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/project/create`,
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
    revalidateTag("PROJECT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get Projects
export const getProjects = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("sadi_portfolio_token")
          ?.value as string,
      },
      body: JSON.stringify(data),
      next: {
        tags: ["PROJECT"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
