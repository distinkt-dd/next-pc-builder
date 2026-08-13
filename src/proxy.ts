import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = new Set(['/', '/login', '/signup'])

function isPublicPath(pathname: string) {
	if (PUBLIC_PATHS.has(pathname)) return true
	if (pathname.startsWith('/api/')) return true
	return false
}

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl

	if (isPublicPath(pathname)) {
		return NextResponse.next()
	}

	const sessionCookie =
		req.cookies.get('authjs.session-token') ??
		req.cookies.get('__Secure-authjs.session-token')

	if (!sessionCookie?.value) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
