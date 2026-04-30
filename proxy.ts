import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasValidAdminSession } from '@/lib/admin-session';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = request.nextUrl.pathname === '/admin/login';

    if (isAdminRoute) {
        if (!isLoginRoute && !await hasValidAdminSession(request)) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        return NextResponse.next();
    }

    return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|sr|ru|de)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
