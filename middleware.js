import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export function middleware(request) {
  const authTokens = request.cookies.get("authTokens")?.value;

  if (request.nextUrl.pathname.startsWith("/home") && !authTokens) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authTokens");
    return response;
  }
  if (authTokens && request.nextUrl.pathname.startsWith("/login")) {
    const response = NextResponse.redirect(new URL("/home", request.url));
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home(.*)", "/login"],
};