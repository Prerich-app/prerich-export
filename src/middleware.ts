import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static assets, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // Files with extensions (js, css, png, svg, etc.)
  ) {
    return NextResponse.next()
  }

  // Only redirect page routes to root
  if (pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and API routes
     */
    "/((?!_next/static|_next/image).*)",
  ],
}
