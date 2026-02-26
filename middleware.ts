import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to suspended page itself
  if (pathname.startsWith("/suspended")) {
    return NextResponse.next();
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  // Redirect everything else
  const url = request.nextUrl.clone();
  url.pathname = "/suspended";

  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/:path*",
};