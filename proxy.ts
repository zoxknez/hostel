import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasValidAdminSession } from '@/lib/admin-session';

export function proxy(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = request.nextUrl.pathname === '/admin/login';

    if (isAdminRoute && !isLoginRoute && !hasValidAdminSession(request)) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
