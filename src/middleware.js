import { NextResponse } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const currentUser = request.cookies.get("access_token")?.value

  // WHEN SIGNED IN, NO ACCESS TO SIGNIN OR SIGNUP PAGE
  if (currentUser && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // WHEN SIGNED OUT, NO ACCESS TO PAGES OTHER THAN SIGNIN OR SIGNUP PAGE
  if (!currentUser && !request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }
}

export const config = {
  // Not all routes require authorization. Use the matcher option in your Middleware to specify any routes that do not require authorization checks.
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
