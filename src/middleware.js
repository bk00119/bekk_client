import { NextResponse } from "next/server"

import { verifyToken } from "./utils/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { pathname, origin } = request.nextUrl

  const access_token = request.cookies.get("access_token")?.value
  const refresh_token = request.cookies.get("refresh_token")?.value

  if (access_token && refresh_token) {
    const access_token_data = await verifyToken(access_token)
    const refresh_token_data = await verifyToken(refresh_token)

    if (refresh_token_data) {
        if (!access_token_data) {
        let response = NextResponse.next()

        // ONLY ACCESS_TOKEN IS EXPIRED -> UPDATE ACCESS_TOKEN
        // MODIFY THIS TO ACTUALLY GET A RENEWED TOKEN
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/access_token/regenerate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            }),
          }
        )

        const data = await res.json()
        const new_access_token = data.access_token

        response.cookies.set("access_token", new_access_token, {
          httpOnly: true,
          sameSite: "lax",
        })
        return response
      }
    } else {
      // REFRESH_TOKEN IS EXPIRED -> SIGN OUT
      let response = NextResponse.redirect(new URL("/auth/signin", request.url))

      response.cookies.delete("access_token")
      response.cookies.delete("refresh_token")
      response.cookies.delete("user_id")

      return response
    }
  }

  // WHEN SIGNED IN, NO ACCESS TO SIGNIN OR SIGNUP PAGE
  if (access_token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // WHEN SIGNED OUT, NO ACCESS TO PAGES OTHER THAN SIGNIN OR SIGNUP PAGE
  if (!access_token && !pathname.startsWith("/auth")) {
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
