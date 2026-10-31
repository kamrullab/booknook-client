import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

function isPrivatePath(pathname: string) {
  if (["/add-book", "/my-books", "/my-borrows", "/profile"].some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return true;
  }

  return pathname.startsWith("/books/");
}

export function proxy(request: NextRequest) {
  if (!isPrivatePath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);
  if (sessionCookie) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
    "/books/:path+",
  ],
};
