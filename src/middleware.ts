import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const isLoggedIn = req.cookies.get('user');

    if (!isLoggedIn && !req.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)'
    ],
};