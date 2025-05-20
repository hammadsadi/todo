import { NextRequest, NextResponse } from "next/server";
import { TUserRole } from "./types/user.types";
import { getCurrentUser } from "./services/AuthServices/index";

const authRoutes = ["/access"];

const sharedRoutes = [/^\/dashboard\/profile/];

const roleBasedPrivateRoutes = {
  USER: [/^\/dashboard\/user/],
  ADMIN: [/^\/dashboard\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/access?redirectPath=${pathname}`, request.url)
    );
  }

  if (sharedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as TUserRole]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as TUserRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/access", "/dashboard", "/dashboard/:path*"],
};
