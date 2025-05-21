"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Create Message
export const createMessages = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/message/create`,
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
    revalidateTag("MESSAGE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get All Message
export const getAllMessages = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/message`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("sadi_portfolio_token")
          ?.value as string,
      },
      next: {
        tags: ["MESSAGE"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
