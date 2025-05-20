/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
// import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

// Register User
export const userRegister = async (userInfo: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("sadi_portfolio_token", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// Login User
export const userLogin = async (userInfo: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("sadi_portfolio_token", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// Get Current Logged in User From Cookie
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("sadi_portfolio_token")?.value;
  let decodeData = null;
  if (accessToken) {
    decodeData = await jwtDecode(accessToken);
    return decodeData;
  } else {
    return null;
  }
};

export const getMe = async () => {
  const accessToken = (await cookies()).get("sadi_portfolio_token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      next: {
        tags: ["ME"],
      },
    });
    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const logOutUser = async () => {
  (await cookies()).delete("sadi_portfolio_token");
};

// export const updateUserProfile = async (
//   userId: string,
//   userInfo: FieldValues
// ) => {
//   const token = await getValidToken();
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify(userInfo),
//       }
//     );
//     await revalidateTag("ME");
//     const result = await res.json();
//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };
