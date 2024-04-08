import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "next-auth/react"

export default async function middleware(req: NextRequest) {
  const { origin, pathname } = req.nextUrl

  // fixes the issue when are assets not loading
  if (pathname.startsWith("/_next")) return NextResponse.next()

  // DO NOT USE NEXT-AUTH!!!
  // THIS IS ALL DAY WORTH OF SEARCHING FOR SOLUTION TO GET A USER SESSION
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  }

  // @ts-expect-error
  const isAuthenticated = !!(await getSession({ req: requestForNextAuth }))

  const isAuthPage = pathname.startsWith("/auth")
  const isRootPage = pathname === "/"

  // if user is on root page then we are checking if he is authenticated, if so => redirecting them to app page, otherwise => redirecting them to auth page
  if (isRootPage)
    return NextResponse.redirect(
      new URL(isAuthenticated ? "/app" : "/auth", origin),
    )

  if (isAuthenticated && isAuthPage)
    // if user is on auth page & he is logged in => redirect them to app page
    return NextResponse.redirect(new URL("/app", origin))

  if (!isAuthenticated && !isAuthPage) {
    // if user is not on auth page & he is not logged in => redirect them to auth page
    const signInUrl = new URL("/auth", origin)
    signInUrl.searchParams.append("callbackUrl", req.url)

    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/app:path*", "/auth:path*"],
}
