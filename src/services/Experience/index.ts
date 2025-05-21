"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Create Experience
export const createExperience = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/experience/create`,
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
    revalidateTag("EXPERIENCE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get All Experience
export const getAllExperience = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/experience`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("sadi_portfolio_token")
            ?.value as string,
        },
        next: {
          tags: ["EXPERIENCE"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
