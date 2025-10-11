import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Cookie } from "./lib/redux/cookie"

const AUTH_COOKIE_NAME = Cookie.Credentials

export function middleware(request: NextRequest) {
	const authCookie = request.cookies.get(AUTH_COOKIE_NAME)

	const { pathname } = request.nextUrl

	if (!authCookie && pathname !== "/") {
		const absoluteURL = new URL("/", request.url)
		return NextResponse.redirect(absoluteURL)
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
		 * - "/register"
		 * - "/"
		 */
		"/((?!register|api|_next/static|_next/image|favicon.ico|$).*)",
	],
}
