import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const authHeader = request.headers.get('authorization');
        const adminToken = request.cookies.get('admin_token');

        // Simple implementation: check for a cookie or basic auth
        // For now, let's just use a simple cookie check
        // In a real app, you'd use NextAuth or a more robust solution
        if (!adminToken && request.nextUrl.pathname !== '/admin/login') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
