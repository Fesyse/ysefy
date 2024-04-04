import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "next-auth/react"

export default async function middleware(req: NextRequest) {
  // fixes the issue when assets not loading on client
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  }

  // @ts-expect-error
  // DO NOT USE NEXT-AUTH!!!
  // THIS IS ALL DAY WORTH OF SEARCHING FOR SOLUTION TO GET A USER SESSION
  const isAuthenticated = !!(await getSession({ req: requestForNextAuth }))

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth")

  if (isAuthenticated && isAuthPage)
    return NextResponse.redirect(new URL("/", req.nextUrl.origin))

  if (!isAuthenticated && !isAuthPage) {
    // the user is not logged in, redirect to the auth page
    const signInUrl = new URL("/auth", req.nextUrl.origin)
    signInUrl.searchParams.append("callbackUrl", req.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/auth:path*"],
}
