import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

const publicRoutes = ["/auth/login", "/auth/sign-up"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get("token")?.value

  if (!token && !pathname.startsWith("/auth")) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (token) {
    try {
      const decoded = jwtDecode(token)
      // @ts-ignore
      const isExpired = decoded.exp * 1000 < Date.now()

      if (isExpired) {
        const response = NextResponse.redirect(new URL("/auth/login", request.url))
        response.cookies.delete("token")
        return response
      }
    } catch {
      const response = NextResponse.redirect(new URL("/auth/login", request.url))
      response.cookies.delete("token")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
