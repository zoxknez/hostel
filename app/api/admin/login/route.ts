import { NextRequest, NextResponse } from 'next/server';
import { applyAdminSessionCookie, clearAdminSessionCookie } from '@/lib/admin-session';

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();
        const adminPassword = process.env.ADMIN_PASSWORD || 'hostel2025';

        if (password === adminPassword) {
            return applyAdminSessionCookie(NextResponse.json({ success: true }));
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE() {
    return clearAdminSessionCookie(NextResponse.json({ success: true }));
}
